import type {AxiosError} from "axios";
import {useToast} from "vue-toastification";

type IError = {
    message: string|undefined;
}

type ErrorData = {
    error: IError|undefined;
}

const simpleMessageHelper = (error: AxiosError) => {
    if(error.response !== undefined) {
        const data: ErrorData = error.response.data as ErrorData
        if(data.error && data.error.message) {
            useToast().error(data.error.message.capitalize())
        }
    }
}

export default simpleMessageHelper