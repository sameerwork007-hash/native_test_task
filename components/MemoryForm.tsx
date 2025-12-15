import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface MemoryFormProps {
    onSubmit: (title: string, description: string) => void;
    isLoading: boolean;
}

/**
 * Form component for entering memory title and description.
 * Includes validation for required fields.
 */
export default function MemoryForm({ onSubmit, isLoading }: MemoryFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleError, setTitleError] = useState('');

    const handleSubmit = () => {
        // Validate title is not empty
        if (!title.trim()) {
            setTitleError('Title is required');
            return;
        }

        setTitleError('');
        onSubmit(title.trim(), description.trim());
    };

    return (
        <View style={styles.container}>
            {/* Title Input */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Title *</Text>
                <TextInput
                    style={[styles.input, titleError ? styles.inputError : null]}
                    placeholder="Enter a title for your memory"
                    value={title}
                    onChangeText={(text) => {
                        setTitle(text);
                        if (titleError) setTitleError('');
                    }}
                    editable={!isLoading}
                    maxLength={100}
                />
                {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
            </View>

            {/* Description Input */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Add a description (optional)"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    editable={!isLoading}
                    maxLength={500}
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
                style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={isLoading}
                activeOpacity={0.8}
            >
                <Text style={styles.submitButtonText}>
                    {isLoading ? 'Uploading...' : 'Upload Memory'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#FFF',
    },
    inputError: {
        borderColor: '#FF3B30',
    },
    textArea: {
        height: 100,
        paddingTop: 12,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    submitButtonDisabled: {
        backgroundColor: '#B0B0B0',
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
