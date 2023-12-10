import adamsecu from '@/router/adamsecu'
import LoginView from '@/views/Auth/LoginView.vue'
import RegisterView from "@/views/Auth/RegisterView.vue";
import ForgotPassword from "@/views/Auth/ForgotPassword.vue";

export default [
  {
    path: '/login',
    name: 'auth.login',
    component: LoginView,
    meta: {
      auth: adamsecu.ACCESS_NO_LOGIN,
    }
  },
  {
    path: '/register',
    name: 'auth.register',
    component: RegisterView,
    meta: {
      auth: adamsecu.ACCESS_NO_LOGIN,
    }
  },
  {
    path: '/forgot-password',
    name: 'auth.forgot-password',
    component: ForgotPassword,
    meta: {
      auth: adamsecu.ACCESS_ALL,
    }
  }
]