export type ToastNotification = {
    error: (text: string) => void;
    success: (text: string) => void;
    info: (text: string) => void;
    warning: (text: string) => void;
}