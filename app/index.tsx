import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import ImagePickerComponent from '../components/ImagePicker';
import MemoryForm from '../components/MemoryForm';
import LoadingOverlay from '../components/LoadingOverlay';
import { uploadImage, createMemory } from '../services/supabase';
import { compressImage } from '../utils/imageCompression';

/**
 * Main screen for creating a new memory.
 * Orchestrates the entire upload flow:
 * 1. User selects an image
 * 2. User enters title and description
 * 3. Image is compressed
 * 4. Image is uploaded to Supabase Storage
 * 5. Memory metadata is saved to database
 * 6. Navigate to success screen
 */
export default function CreateMemoryScreen() {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (title: string, description: string) => {
        // Validate that an image is selected
        if (!selectedImage) {
            Alert.alert('Error', 'Please select an image before uploading.');
            return;
        }

        setIsLoading(true);

        try {
            // Step 1: Compress the image to reduce upload size
            const compressedUri = await compressImage(selectedImage);

            // Step 2: Upload image to Supabase Storage
            const fileName = `memory_${Date.now()}.jpg`;
            const uploadResult = await uploadImage(compressedUri, fileName);

            if (!uploadResult.success || !uploadResult.url) {
                throw new Error(uploadResult.error || 'Failed to upload image');
            }

            // Step 3: Create memory record in database
            const createResult = await createMemory({
                title,
                description,
                image_url: uploadResult.url,
            });

            if (!createResult.success || !createResult.data) {
                throw new Error(createResult.error || 'Failed to create memory');
            }

            // Step 4: Navigate to success screen with memory data
            router.push({
                pathname: '/success',
                params: {
                    title: createResult.data.title,
                    imageUrl: createResult.data.image_url,
                },
            });
        } catch (error) {
            console.error('Error creating memory:', error);
            Alert.alert(
                'Upload Failed',
                error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    <Text style={styles.instructions}>
                        Create a new memory by selecting an image and adding details.
                    </Text>

                    <ImagePickerComponent
                        selectedImage={selectedImage}
                        onImageSelected={setSelectedImage}
                    />

                    <MemoryForm
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                </View>
            </ScrollView>

            <LoadingOverlay
                visible={isLoading}
                message="Uploading your memory..."
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        padding: 20,
    },
    instructions: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
        lineHeight: 20,
    },
});
