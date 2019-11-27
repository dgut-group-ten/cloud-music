<template>
  <div class="home">
    <Head @loginHandle="loginHandle"></Head>

    <el-dialog :visible.sync="dialogVisible" width="35%" :title="title">
      <el-tabs type="card" stretch v-model="name" @tab-click="clickHandle">
        <el-tab-pane label="登录" name="first">
          <Login @hideDialog="hideDialog"></Login>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <Register></Register>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Head from '@/components/common/Head.vue';
import Register from '@/components/user/Register.vue';
import Login from '@/components/user/Login.vue';

export default {
  name: 'home',
  components: {
    Head,
    Register,
    Login
  },
  data() {
    return {
      dialogVisible: false,
      name: 'first',
      title: '用户名登录'
    };
  },
  methods: {
    loginHandle() {
      this.dialogVisible = true;
      document.querySelector('.el-dialog').classList.add('side-in');
    },
    clickHandle(e) {
      if(e.name === 'first') this.title = '用户名登录';
      else this.title = '邮箱注册';
    },
    hideDialog() {
      this.dialogVisible = false;
      document.querySelector('.el-dialog').classList.remove('side-in');
    }
  }
};
</script>


<style lang="less">
@import "../styles/common.less";
@import "../styles/animation.css";

.home {
  .el-dialog {
    .el-dialog__header {
      padding: 10px 20px 10px;
      background: @bg-color;
      .el-dialog__title {
        color: @color;
        font-size: @fs;
      }
      .el-dialog__headerbtn {
        top: 12px;
      }
    }
  }
}
</style>
