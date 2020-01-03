<template>
  <el-menu :default-active="activeIndex" background-color="#545c64" mode="horizontal" text-color="#fff" active-text-color="#c40b0b">
    <el-menu-item index="1">
      <router-link to="/home">首页</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/mine">我的音乐</router-link>
    </el-menu-item>
    <el-menu-item index="3" @click="_loginHandle" v-if="!isLogin" class="fr">登录</el-menu-item>
    <el-submenu index="4" v-if="isLogin" class="fr">
      <template slot="title">{{userInfo.name}}</template>
      <el-menu-item index="4-1" @click="_logout">退出登录</el-menu-item>
    </el-submenu>
    <el-menu-item index="5" class="fr">
      <el-input
        placeholder="搜索音乐、歌单、用户"
        v-model="searchText"
        @keyup.enter.native="search">
        <i slot="suffix" class="el-icon-search" @click="search"></i>
      </el-input>
    </el-menu-item>
  </el-menu>
</template>

<script>
import merge from 'webpack-merge';
export default {
  name: 'Head',
  data() {
    return {
      activeIndex: '1',
      userInfo: null,
      searchText:''
    };
  },
  methods: {
    _loginHandle() {
      this.$emit('loginHandle');
    },
    _logout() {
      this.$store.dispatch('logout');
      this.$message({
          message: '您的帐号已成功退出！',
          type: 'success'
      });
      // 回到首页，避免页面权限访问出错
      this.$router.push({name:'main'});
    },
    search() {
      let searchText = this.searchText;
      if (searchText == null) { return;}
      this.searchText = null;
      this.$router.push({name:'search',query: {searchText}});
    }
  },
  created() {
    // 查看本地储存中有没有用户登录信息
    let state = JSON.parse(localStorage.getItem("state")) || null;
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
  border: 0;
  a{
    font-size: @fs;
  }
  .fr{
    float: right;
  }
}
</style>
