// styles
import './assets/styles/main.css'
import 'vue-toastification/dist/index.css'
import 'tippy.js/dist/tippy.css'
// modifications
import './assets/styles/modified/toast.css'
import './assets/styles/modified/tippy.css'

// packages
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from '@/i18n'
import {routePath} from "@/scripts/axios/routes";
import axios from '@/scripts/axios'
import Toast, { useToast } from "vue-toastification"
import VueTippy from 'vue-tippy'

// helpers
import './scripts/helpers/capitalize'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Toast, {})
app.use(VueTippy, {
    directive: 'tippy',
    component: 'Tippy',
})

app.config.globalProperties.$toast = useToast()
app.config.globalProperties.api_route = routePath
app.config.globalProperties.$http = axios
app.config.globalProperties.$isLoading = true

app.mount('#app')
