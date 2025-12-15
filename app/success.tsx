import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

/**
 * Success screen displayed after a memory is successfully created.
 * Shows confirmation message and the uploaded image.
 */
export default function SuccessScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { title, imageUrl } = params;

    const handleCreateAnother = () => {
        // Navigate back to the create screen
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Success Icon */}
                <View style={styles.iconContainer}>
                    <Ionicons name="checkmark-circle" size={80} color="#34C759" />
                </View>

                {/* Success Message */}
                <Text style={styles.title}>Memory Created Successfully!</Text>
                <Text style={styles.subtitle}>
                    Your memory "{title}" has been uploaded.
                </Text>

                {/* Display Uploaded Image */}
                {imageUrl && (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: imageUrl as string }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                )}

                {/* Create Another Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCreateAnother}
                    activeOpacity={0.8}
                >
                    <Ionicons name="add-circle-outline" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>Create Another Memory</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 32,
        paddingHorizontal: 20,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 4 / 3,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        gap: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
