import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { CreateMemoryInput, Memory, UploadResult, ApiResponse } from '../types/memory';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate that credentials are provided
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials. Please check your .env file.');
}

// Create Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Uploads an image to Supabase Storage and returns the public URL.
 * 
 * @param uri - Local URI of the image file
 * @param fileName - Name to use for the uploaded file
 * @returns UploadResult with success status and URL or error message
 */
export async function uploadImage(uri: string, fileName: string): Promise<UploadResult> {
    try {
        // Fetch the image as a blob
        const response = await fetch(uri);
        const blob = await response.blob();

        // Create a unique file name with timestamp to avoid conflicts
        const timestamp = Date.now();
        const uniqueFileName = `${timestamp}_${fileName}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('memory-images')
            .upload(uniqueFileName, blob, {
                contentType: 'image/jpeg',
                cacheControl: '3600',
            });

        if (error) {
            console.error('Upload error:', error);
            return {
                success: false,
                error: error.message,
            };
        }

        // Get public URL for the uploaded image
        const { data: urlData } = supabase.storage
            .from('memory-images')
            .getPublicUrl(data.path);

        return {
            success: true,
            url: urlData.publicUrl,
        };
    } catch (error) {
        console.error('Upload exception:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
    }
}

/**
 * Creates a new memory record in the database.
 * 
 * @param input - Memory data (title, description, image_url)
 * @returns ApiResponse with the created Memory or error message
 */
export async function createMemory(input: CreateMemoryInput): Promise<ApiResponse<Memory>> {
    try {
        const { data, error } = await supabase
            .from('memories')
            .insert([
                {
                    title: input.title,
                    description: input.description,
                    image_url: input.image_url,
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('Database error:', error);
            return {
                success: false,
                error: error.message,
            };
        }

        return {
            success: true,
            data: data as Memory,
        };
    } catch (error) {
        console.error('Create memory exception:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
    }
}
