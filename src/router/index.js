import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Main from '@/components/playlist/Main.vue';
import Detail from '@/components/playlist/Detail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[ 
      {
        path:'main',
        component: Main
      },
      {
        path:'detail',
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
