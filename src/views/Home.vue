<template>
  <div class="home">
    <Head @loginHandle="loginHandle"></Head>
    <router-view/>
    
    <el-dialog :visible.sync="dialogVisible" width="35%" :title="title">
      <el-tabs type="card" stretch v-model="name">
        <el-tab-pane label="登录" name="first">
          <Login @hideDialog="hideDialog"></Login>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <Register @registered="registered"></Register>
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
    };
  },
  computed: {
    title() {
      return this.name === 'first' ? '用户名登录' : '邮箱注册';
    }
  },
  methods: {
    loginHandle() {
      this.dialogVisible = true;
      document.querySelector('.el-dialog').classList.add('side-in');
    },
    hideDialog() {
      this.dialogVisible = false;
      document.querySelector('.el-dialog').classList.remove('side-in');
    },
    registered() {
      this.name = 'first';
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
