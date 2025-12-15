import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

interface ImagePickerComponentProps {
    selectedImage: string | null;
    onImageSelected: (uri: string) => void;
}

/**
 * Component for selecting images from the device's media library.
 * Handles permission requests and displays the selected image.
 */
export default function ImagePickerComponent({ selectedImage, onImageSelected }: ImagePickerComponentProps) {
    const pickImage = async () => {
        try {
            // Request media library permissions
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Please grant permission to access your photos to upload a memory.',
                    [{ text: 'OK' }]
                );
                return;
            }

            // Launch image picker
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets[0]) {
                onImageSelected(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Image *</Text>

            <TouchableOpacity
                style={styles.imagePicker}
                onPress={pickImage}
                activeOpacity={0.7}
            >
                {selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={styles.image} />
                ) : (
                    <View style={styles.placeholder}>
                        <Ionicons name="image-outline" size={48} color="#999" />
                        <Text style={styles.placeholderText}>Tap to select an image</Text>
                    </View>
                )}
            </TouchableOpacity>

            {selectedImage && (
                <TouchableOpacity
                    style={styles.changeButton}
                    onPress={pickImage}
                >
                    <Ionicons name="refresh" size={16} color="#007AFF" />
                    <Text style={styles.changeButtonText}>Change Image</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    imagePicker: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    placeholderText: {
        marginTop: 8,
        fontSize: 14,
        color: '#999',
    },
    changeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        padding: 8,
    },
    changeButtonText: {
        marginLeft: 6,
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '500',
    },
});
