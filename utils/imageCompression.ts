import * as ImageManipulator from 'expo-image-manipulator';

/**
 * Compresses an image to reduce file size while maintaining reasonable quality.
 * This improves upload speed and reduces storage costs.
 * 
 * @param uri - The local URI of the image to compress
 * @returns The URI of the compressed image
 */
export async function compressImage(uri: string): Promise<string> {
    try {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
            uri,
            [
                // Resize to max width of 1200px while maintaining aspect ratio
                { resize: { width: 1200 } },
            ],
            {
                // Compress to 80% quality (good balance between quality and size)
                compress: 0.8,
                format: ImageManipulator.SaveFormat.JPEG,
            }
        );

        return manipulatedImage.uri;
    } catch (error) {
        console.error('Error compressing image:', error);
        // If compression fails, return original URI
        return uri;
    }
}
