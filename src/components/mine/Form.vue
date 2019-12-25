<template>
  <div class="wrapper">
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item :label="labelText[type][0]" prop="oldThing">
        <el-input v-model="formData.oldThing"></el-input>
        <el-button class="checkCode" v-if="type === 'mail'" @click.prevent="checkCode">获取验证码</el-button>
      </el-form-item>
      <el-form-item :label="labelText[type][1]" prop="newThing">
        <el-input v-model="formData.newThing"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import {modifyPassword} from '@/api/user.js';
export default {
  name: 'Form',
  data() {
    return {
      formData:{
        oldThing:'',
        newThing: ''
      },
      rules:{
        oldThing: [{ required: true, message: '此项不允许为空', trigger: 'blur' },],
        newThing: [{ required: true, message: '此项不允许为空', trigger: 'blur' },],
      },
      labelText:{
        password:['旧密码','新密码'],
        mail:['新邮箱','验证码'],
      }
    }
  },
  props:['type'],
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let fn = this.getApi();
          fn(this.formData.oldThing,this.formData.newThing)
          .then(res=>{
             this.$message(res.message);
          })
          .catch(err=>{
            console.log(err)
          })
        } else {
          this.$message.error('请先完善必填项!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getApi(){
      switch(this.type){
        case 'password':
          return modifyPassword;
      }
    }
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