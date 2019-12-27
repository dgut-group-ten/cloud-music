<template>
  <div class="wrapper">
    <div class="container">
      <header>{{title[send]}}</header>
      <main>
        <!-- 验证邮箱表单 -->
        <el-form v-if="send === 0" :model="firstForm" :rules="firstRules" ref="first">
          <el-form-item label="输入需要修改密码的邮箱帐号" prop="mail">
            <el-input v-model="firstForm.mail" placeholder="邮箱帐号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('first')">下一步</el-button>
          </el-form-item>
        </el-form>
        <!-- 正式提交表单 -->
        <el-form v-else :model="secondForm" :rules="secondRules" ref="second">
          <el-form-item label="输入邮箱中收到的验证码" prop="checkCode">
            <el-input v-model="secondForm.mail" placeholder="验证码"></el-input>
          </el-form-item>
          <el-form-item label="输入你要修改的新密码" prop="password">
            <el-input v-model="secondForm.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="secondForm.confirmPassword" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('second')">下一步</el-button>
          </el-form-item>
        </el-form>
      </main>
    </div>
  </div>
</template>

<script>
import {getCheckCode} from '@/api/user.js';
export default {
  name: 'Reset',
  data(){
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.secondForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      send:0,
      title:['输入帐号','填写相关信息'],
      firstForm:{
        mail:''
      },
      firstRules: {
        mail: [{ required: true, message: '邮箱帐号不能为空', trigger: 'blur' }]
      },
      secondForm:{
        checkCode:'',
        password:'',
        confirmPassword:''
      },
      secondRules: {
        checkCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        confirmPassword: [{ validator:validatePassword, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleSubmit();
        } else {
          this.$message.error('必填项不能为空!!');
          return false;
        }
      });
    },
    handleSubmit(){
      if(this.send===0){
        getCheckCode(this.firstForm.mail)
        .then(res=>{
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.send = 1 ;
        })
        .catch(err=>{
          let message = err.response.data.msg || err.message;
          this.$message.error(message);
        })
      } else {

      }
    }
  }
}

</script>
<style scoped lang='less'>
@import '../../styles/common.less';
  .wrapper{
    width: 100%;
    min-height: 650px;
    background: #f4f4f4;
    .container{
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      width:80%;
      background:#fff;
      header{
        font-size: @fs-xxxl;
        font-weight: @fw-l;
        text-align: center;
        margin: 30px 0;
        border-bottom: 2px solid #f4f4f4;
        padding-bottom: 40px;
      }
      main{
        width: 50%;
        margin:0 auto;
        .el-button{
          margin-top: 20px;
          margin-left: 50%;
          transform: translate(-50%,0);
        }
      }
    }
  }
</style>