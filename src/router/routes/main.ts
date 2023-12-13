import HomeView from '@/views/HomeView.vue'
import adamsecu from "@/router/adamsecu";
import JoinView from "@/views/JoinView.vue";
import DashboardView from "@/views/Dashboard/DashboardView.vue";
import AboutView from "@/views/AboutView.vue";
import EditQuizQuestions from "@/views/Dashboard/EditQuizQuestions.vue";
import PlayQuiz from "@/views/Play/PlayQuiz.vue";
import MyQuizzes from "@/views/Dashboard/MyQuizzes.vue";
import BeforePlay from "@/views/Play/BeforePlay.vue";

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
    path: '/join/:id',
    name: 'join.id',
    component: BeforePlay,
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
  {
    path: '/dashboard/quizzes',
    name: 'dashboard.quizzes',
    component: MyQuizzes,
    meta: {
      auth: adamsecu.ACCESS_LOGIN
    }
  },
  {
    path: '/dashboard/quizzes/:id/questions',
    name: 'dashboard.quizzes.questions',
    component: EditQuizQuestions,
    meta: {
      auth: adamsecu.ACCESS_LOGIN
    }
  },
  {
    path: '/play/:id',
    name: 'play',
    component: PlayQuiz,
    meta: {
      auth: adamsecu.ACCESS_LOGIN
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      auth: adamsecu.ACCESS_ALL
    }
  },
]