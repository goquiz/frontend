import HomeView from '@/views/HomeView.vue'
import guard from "@/router/guard";
import JoinView from "@/views/JoinView.vue";
import DashboardView from "@/views/Dashboard/DashboardView.vue";
import AboutView from "@/views/AboutView.vue";
import EditQuizQuestions from "@/views/Dashboard/EditQuizQuestions.vue";
import PlayQuiz from "@/views/Play/PlayQuiz.vue";
import MyQuizzes from "@/views/Dashboard/MyQuizzes.vue";
import BeforePlay from "@/views/Play/BeforePlay.vue";
import QuizHosts from "@/views/Dashboard/QuizHosts.vue";
import WelcomeView from "@/views/WelcomeView.vue";
import TermsView from "@/views/Terms/TermsView.vue";
import PrivacyView from "@/views/Terms/PrivacyView.vue";
import CompletedQuizzesView from "@/views/Dashboard/CompletedQuizzesView.vue";
import CompletedQuizView from "@/views/Dashboard/CompletedQuizView.vue";

export default [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView,
    meta: {
      auth: guard.ACCESS_ALL
    }
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      auth: guard.ACCESS_LOGIN
    }
  },
  {
    path: '/join',
    name: 'join',
    component: JoinView,
    meta: {
      auth: guard.ACCESS_LOGIN
    }
  },
  {
    path: '/join/:id',
    name: 'join.id',
    component: BeforePlay,
    meta: {
      auth: guard.ACCESS_LOGIN
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      auth: guard.ACCESS_LOGIN
    }
  },
  {
    path: '/dashboard/quizzes',
    name: 'dashboard.quizzes',
    component: MyQuizzes,
    meta: {
      auth: guard.ACCESS_LOGIN
    }
  },
  {
    path: '/dashboard/quizzes/:id/questions',
    name: 'dashboard.quizzes.questions',
    component: EditQuizQuestions,
    meta: {
      auth: guard.ACCESS_LOGIN
    }
  },
  {
    path: '/dashboard/quizzes/:id/hosts',
    name: 'dashboard.quizzes.hosts',
    component: QuizHosts,
    meta: {
      auth: guard.ACCESS_LOGIN
    }
  },
  {
    path: '/dashboard/completed',
    name: 'dashboard.completed',
    component: CompletedQuizzesView,
    meta: {
      auth: guard.ACCESS_LOGIN
    }
  },
  {
    path: '/dashboard/completed/:id',
    name: 'dashboard.completed.specific',
    component: CompletedQuizView,
    meta: {
      auth: guard.ACCESS_LOGIN
    }
  },
  {
    path: '/play/:id',
    name: 'play',
    component: PlayQuiz,
    meta: {
      auth: guard.ACCESS_LOGIN
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      auth: guard.ACCESS_ALL
    }
  },
  {
    path: '/terms',
    name: 'terms',
    component: TermsView,
    meta: {
      auth: guard.ACCESS_ALL
    }
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: PrivacyView,
    meta: {
      auth: guard.ACCESS_ALL
    }
  }
]