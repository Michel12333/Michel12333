import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue';
import FirebaseSigninView from '@/views/FirebaseSigninView.vue';
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue';
// import store from '../store/store';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    // Per-router Guard
    // beforeEnter: (to, from) =>{
    //   return false
    // }
  },
  {
    path:'/login',
    name:'Login',
    component: LoginView,
  },
  {
    path:'/FireLogin',
    name:'FireLogin',
    component: FirebaseSigninView,
  },
  {
    path:'/FireRegister',
    name:'FireRegister',
    component: FirebaseRegisterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

import { getAuth, onAuthStateChanged } from 'firebase/auth';

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      next();
    } else {
      // User is signed out
      if (to.name !== 'Login' && to.name !== 'FireLogin' && to.name !== 'FireRegister') {
        next('/login');
      } else {
        next();
      }
    }
  });
});
export default router