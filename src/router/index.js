import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Player from '../views/Player.vue';
import Main from '@/components/playlist/Main.vue';
import Detail from '@/components/playlist/Detail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[ 
      {
        path:'home',
        name:'main',
        component: Main
      },
      {
        path:'home/detail',
        name:'detail',
        component: Detail
      }
    ]
  },
  {
    path: '/player',
    name: 'player',
    component: Player
  }
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

export default router;
