import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Main from '@/components/playlist/Main.vue';
import Detail from '@/components/playlist/Detail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home/main'
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[ 
      {
        path:'home/main',
        name:'main',
        component: Main
      },
      {
        path:'home/detail',
        name:'detail',
        component: Detail
      }
  ]
  }
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

export default router;
