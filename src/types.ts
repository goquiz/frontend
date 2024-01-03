import type {WindowFetched} from "@/types/windowFetched";

export type Config = {
    API_URL: string;
    FETCHED: WindowFetched;
}

declare global {
    interface Window {
        config: Config;
    }
}