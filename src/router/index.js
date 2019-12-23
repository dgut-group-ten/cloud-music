import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Player from '../views/Player.vue';
import Main from '@/components/playlist/Main.vue';
import Detail from '@/components/playlist/Detail.vue';
import Search from '@/components/search/Search.vue';
import Mine from '@/components/mine/Mine.vue';
import Prompt from '@/components/mine/Prompt.vue';

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
        component: Main,
        meta:{
          title: 'QO音乐'
        }
      },
      {
        path:'home/detail',
        name:'detail',
        component: Detail,
        meta:{
          title: '歌单详情'
        }
      },
      {
        path:'search',
        name:'search',
        component: Search,
        meta:{
          title: '搜索页面'
        }
      },
      {
        path:'mine',
        name:'mine',
        component: Mine,
        meta:{
          title: '我的音乐'
        }
      },
      {
        path:'prompt',
        name:'prompt',
        component: Prompt,
        meta:{
          title: '请先进行登录'
        }
      }
    ]
  },
  {
    path: '/player',
    name: 'player',
    component: Player,
  },
  
];

// 解决自跳转控制台出现的警告
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  routes
});

// 全局路由拦截-进入页面前执行
router.beforeEach((to, from, next) => {
  // 设置每个页的title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if(to.path === '/mine'){
    let state = JSON.parse(localStorage.getItem("state")) || null;
    if(state === null || state.userInfo === null){
      next('/prompt');
    } else {
      next();
    }
  } else {
    // 继续执行
    next();
  }
});

export default router;
