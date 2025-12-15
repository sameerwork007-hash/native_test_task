export interface Memory {
    id: string;
    title: string;
    description: string | null;
    image_url: string;
    created_at: string;
}

export interface CreateMemoryInput {
    title: string;
    description: string;
    image_url: string;
}

export interface UploadResult {
    success: boolean;
    url?: string;
    error?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
