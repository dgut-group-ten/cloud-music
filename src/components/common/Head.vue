<template>
  <el-menu :default-active="activeIndex" background-color="#242424" mode="horizontal" text-color="#fff" active-text-color="#c40b0b">
    <el-menu-item index="1">发现音乐</el-menu-item>
    <el-menu-item index="2">我的音乐</el-menu-item>
    <el-menu-item index="3">朋友</el-menu-item>
    <el-menu-item index="4">商城</el-menu-item>
    <el-menu-item index="5">音乐人</el-menu-item>
    <el-menu-item @click="_loginHandle">登录</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Head',
  data() {
    return {
        activeIndex: '1'
    };
  },
  methods: {
    _loginHandle() {
        this.$emit('loginHandle');
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
}
</style>
