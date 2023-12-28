export type Config = {
    API_URL: string;
    CAPTCHA_KEY: string;
}

declare global {
    interface Window {
        config: Config;
    }
}