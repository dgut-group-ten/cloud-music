<template>
  <el-menu :default-active="activeIndex" background-color="#545c64" mode="horizontal" text-color="#fff" active-text-color="#c40b0b">
    <el-menu-item index="1">发现音乐</el-menu-item>
    <el-menu-item index="2">我的音乐</el-menu-item>
    <el-menu-item index="3">朋友</el-menu-item>
    <el-menu-item index="4">商城</el-menu-item>
    <el-menu-item index="5">音乐人</el-menu-item>
    <el-menu-item index="6" @click="_loginHandle" v-if="!isLogin">登录</el-menu-item>
    <el-submenu index="7" v-if="isLogin" class="user-info">
      <template slot="title">{{userInfo.name}}</template>
      <el-menu-item index="7-1" @click="_logout">退出登录</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'Head',
  data() {
    return {
      activeIndex: '1',
      userInfo: null
    };
  },
  methods: {
    _loginHandle() {
      this.$emit('loginHandle');
    },
    _logout() {
      this.$store.dispatch('logout');
    }
  },
  created() {
    // 查看本地储存中有没有用户登录信息
    let state = JSON.parse(localStorage.getItem("state") || null);
    if (state) {
      this.userInfo = state.userInfo;
    }
  },
  computed: {
    isLogin:{
      get(){
        return this.$store.state.userInfo == null ? false : true; 
      },
      set(newValue){}
    }
  },
  watch: {
    isLogin(newValue, oldValue) {
      if (newValue === true) {
        let state = JSON.parse(localStorage.getItem("state") || null);
        if (state) {
          this.userInfo = state.userInfo;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/common.less';
.el-menu {
  box-sizing: border-box;
  width: 100%;
  padding: 0 180px;
  .user-info{
    float: right;
  }
}
</style>
