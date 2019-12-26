<template>
  <div class="wrapper">
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item :label="labelText[type][0]" prop="firstItem">
        <el-input v-model="formData.firstItem"></el-input>
        <el-button class="checkCode" v-if="type === 'mail'" @click.prevent="checkCode" :disabled="disabled">{{tip}}</el-button>
      </el-form-item>
      <el-form-item :label="labelText[type][1]" prop="secondItem">
        <el-input v-model="formData.secondItem"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import {modifyPassword, modifyMail, checkCode} from '@/api/user.js';
export default {
  name: 'Form',
  data() {
    return {
      formData:{
        firstItem:'',
        secondItem: ''
      },
      rules:{
        firstItem: [{ required: true, message: '此项不允许为空', trigger: 'blur' },],
        secondItem: [{ required: true, message: '此项不允许为空', trigger: 'blur' },],
      },
      labelText:{
        password:['旧密码','新密码'],
        mail:['新邮箱','验证码'],
      },
      send: 0,
      tip: '获取验证码',
      disabled: false
    }
  },
  props:['type'],
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let fn = this.getApi();
          fn(this.formData.firstItem,this.formData.secondItem)
          .then(res=>{
             this.$message({
              message: res.message,
              type: 'success'
            });
            this.resetForm('ruleForm');
          })
          .catch(err=>{
            let message = err.response.data.msg || err.message;
            this.$message.error(message);
          })
        } else {
          this.$message.error('请先完善必填项!!');
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 根据type判断所需的api
    getApi(){
      switch(this.type){
        case 'password':
          return modifyPassword;
        case 'mail':
          return modifyMail;
      }
    },
    // 获取验证码
    checkCode() {
      this.send = 1;
      this.disabled = true;
      let num = 60;
      let timer = setInterval(() => {
        num--;
        this.tip = num+'s';
        if (num === 0) {
          clearInterval(timer);
          this.tip = '获取验证码';
          this.send = 0;
          this.disabled = false;
        }
      }, 1000);

      checkCode(this.formData.firstItem)
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
  }
}

</script>
<style scoped lang='less'>
  .wrapper{
    width: 50%;
    .checkCode{
      position: absolute;
      right:  0;
      bottom: 1px;
      transform: translate(105%,0);
    }
  }
</style>