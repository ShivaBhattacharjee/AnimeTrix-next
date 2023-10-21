export interface Error {
    response?: {
        data?: {
            error?: string;
        };
    };
    message: string;
}
