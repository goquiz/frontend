import type {RouteRecordRaw} from 'vue-router'
import {createRouter, createWebHistory} from 'vue-router'
import main from '@/router/routes/main'
import auth from '@/router/routes/auth'
import {useAuthStore} from "@/stores/auth";
import GuardTypes from "@/router/adamsecu";
import {useLoadingStore} from "@/stores/loading";

const routes: Array<RouteRecordRaw> = [
  ...main,
  ...auth,
  {
    path: '/:pathMatch(.*)',
    name: 'errors.not_found',
    component: () => import('../views/Errors/NotFound.vue')
  }
] as Array<RouteRecordRaw>

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const loading = useLoadingStore()
  if(!auth.isChecked) await auth.checkStatus()
  loading.isLoading = false
  if(to?.meta?.auth) {
    const auth_meta = to.meta.auth
    if(auth_meta == GuardTypes.ACCESS_LOGIN && !auth.isLoggedIn) {
      next('/login')
    } else if(auth_meta == GuardTypes.ACCESS_NO_LOGIN && auth.isLoggedIn) {
      next(from)
    } next()
  } else next()
})

export default router
