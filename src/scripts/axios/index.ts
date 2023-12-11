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
        config.headers.Authorization = window.localStorage.getItem('session')
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