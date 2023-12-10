import type {ToastNotification} from "@/types/vuetoast";
import instance from "@/scripts/axios";
export {}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        api_route: (route: string) => string;
        $http: typeof instance;
        $toast: ToastNotification;
    }
}