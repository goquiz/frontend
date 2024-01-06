import guard from '@/router/guard'
import LoginView from '@/views/Auth/LoginView.vue'
import RegisterView from "@/views/Auth/RegisterView.vue";
import EmailVerification from "@/views/Auth/EmailVerification.vue";
import ResetPassword from "@/views/Auth/ResetPassword.vue";

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
    component: ResetPassword,
    meta: {
      auth: guard.ACCESS_ALL,
    }
  },
  {
    path: '/email-verification/:token',
    name: 'auth.email-verification',
    component: EmailVerification,
    meta: {
      auth: guard.ACCESS_ALL,
    }
  },
  {
    path: '/reset-password/:token',
    name: 'auth.reset-password',
    component: ResetPassword,
    meta: {
      auth: guard.ACCESS_ALL,
    }
  },
]