import HomeView from '@/views/HomeView.vue'
import adamsecu from "@/router/adamsecu";
import JoinView from "@/views/JoinView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      auth: adamsecu.ACCESS_LOGIN
    }
  },
  {
    path: '/join',
    name: 'join',
    component: JoinView,
    meta: {
      auth: adamsecu.ACCESS_LOGIN
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      auth: adamsecu.ACCESS_LOGIN
    }
  },
]