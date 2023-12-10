import axios from 'axios'
import { base_url } from "@/scripts/axios/routes";
import {useRequestLoaderStore} from "@/stores/requestLoader";

const instance = axios.create({
    baseURL: base_url,
    withCredentials: true,
})

instance.interceptors.request.use(
    async (config) => {
        const requestLoader = useRequestLoaderStore()
        requestLoader.update(1) // 1 means request is started
        config.headers['X-Frontend-Client'] = "Vue3/web"
        config.headers.Authorization = 'Bearer e917f9a2-d1f6-4bab-8074-eaad9a3ebe4b'
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (config) => {
        return config
    },
    (config) => {
        return config
    }
)

export default instance