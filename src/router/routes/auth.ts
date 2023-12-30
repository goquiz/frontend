import guard from '@/router/guard'
import LoginView from '@/views/Auth/LoginView.vue'
import RegisterView from "@/views/Auth/RegisterView.vue";
import ForgotPassword from "@/views/Auth/ForgotPassword.vue";

export default [
  {
    path: '/login',
    name: 'auth.login',
    component: LoginView,
    meta: {
      auth: guard.ACCESS_NO_LOGIN,
    }
  },
  {
    path: '/register',
    name: 'auth.register',
    component: RegisterView,
    meta: {
      auth: guard.ACCESS_NO_LOGIN,
    }
  },
  {
    path: '/forgot-password',
    name: 'auth.forgot-password',
    component: ForgotPassword,
    meta: {
      auth: guard.ACCESS_ALL,
    }
  }
]