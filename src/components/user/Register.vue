<template>
  <el-form
    :model="registerInfo"
  >
    <el-form-item>
      <el-input
        v-model="registerInfo.name"
        placeholder="用户名"
        autofocus
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="registerInfo.password"
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
        email: '',
        name: '',
        password: '',
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

      checkCode(this.registerInfo.email)
      .then(res => {
        this.$message({
          message: res.message,
          type: 'success'
        })
      })
      .catch(err => {
        let message = err.response.data.msg || err.message;
        this.$message.error(message);
      });
    },
    _register() {
      register(this.registerInfo)
      .then(res => {
        this.$message({
          message: res.message,
          type: 'success'
        });
        this._initRegisterInfo();
        this.$emit('registered');
      })
      .catch(err => {
        let message = err.response.data.msg || err.message;
        this.$message.error(message);
      })
    },
    _initRegisterInfo() {
      this.registerInfo = {
        email: '',
        name: '',
        password: '',
        checkCode: null
      }
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
