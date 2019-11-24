<template>
  <el-form
    :model="registerInfo"
  >
    <el-form-item>
      <el-input
        v-model="registerInfo.user_name"
        placeholder="用户名"
        autofocus
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="registerInfo.user_password"
        placeholder="密码"
        type="password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="registerInfo.email" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item class="code">
      <el-input
        v-model.number="registerInfo.checkCode"
        placeholder="验证码"
      ></el-input>
      <el-button @click="_checkCode" :disabled="disabled">{{ tip }}</el-button>
    </el-form-item>
    <el-form-item class="register">
      <el-button @click="_register" type="primary">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { register, checkCode } from '@/api/user.js';

export default {
  name: 'register',
  data() {
    return {
      labelPosition: 'right',
      registerInfo: {
        email: '455039690@qq.com',
        user_name: 'fang',
        user_password: '123456',
        checkCode: null
      },
      send: 0,
      tip: '发送',
      disabled: false
    };
  },
  methods: {
    _checkCode() {
      this.send = 1;
      this.disabled = true;
      var num = 60;
      var timer = setInterval(() => {
        num--;
        this.tip = num;
        if (num === 0) {
          clearInterval(timer);
          this.tip = '发送';
          this.send = 0;
          this.disabled = false;
        }
      }, 1000);

      checkCode(this.registerInfo.email).then(res => {
        console.log(res);
        this.$message({
          message: res.message,
          type: 'success'
        })
      });
    },
    _register() {
      register(this.registerInfo).then(res => {
        this.$message({
          message: res.message,
          type: 'success'
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  margin: 0 auto;
  .el-form-item {
    margin-bottom: 10px;
    &.code {
      position: relative;
      .el-button {
        width: 100px;
        position: absolute;
        top: 0;
        right: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

    &.register {
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
