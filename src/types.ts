export type Config = {
    API_URL: string;
}

declare global {
    interface Window {
        config: Config;
    }
}