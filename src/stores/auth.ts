import { defineStore } from "pinia"
import type {AxiosResponse} from "axios";
import type {User} from "@/types/user";
import axios from "@/scripts/axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User|null,
        isChecked: false,
    }),
    getters: {
        isLoggedIn: (state) => state.user !== null
    },
    actions: {
         async checkStatus() {
            this.isChecked = true
            let res: AxiosResponse
            try {
                res = await axios.get('/me')
            } catch(e: unknown) {
                this.user = null
                return
            }
            if(res && res.status == 200 && Object.keys(res.data).includes('authUser') && res.data['authUser'] != null) {
                this.user = res.data['authUser'] as User
            }
        },
        logout() {
             this.user = null
        }
    }
})