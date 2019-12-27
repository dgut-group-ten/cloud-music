<template>
    <el-form :model="userInfo">
        <el-form-item>
            <el-input v-model="userInfo.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="userInfo.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="_login" type="primary">登录</el-button>
        </el-form-item>
        <div class="forget" @click="reset">忘记密码？</div>
    </el-form>
</template>

<script>
import { login } from '@/api/user.js';
export default {
    name: 'Login',
    data() {
        return {
            labelPosition: 'right',
            userInfo: {
                name: '',
                password: ''
            }
        }
    },
    methods: {
        _login() {
            login(this.userInfo)
            .then(res => {
                this.$message({
                    message: res.message,
                    type: 'success'
                });
                this.$emit('hideDialog');
                this.$store.dispatch('logined',res.data);
                this.$router.push({name:'main'});
            })
            .catch(err => {
                let message = err.response.data.msg || err.message;
                this.$message.error(message);
            })
        },
        reset(){
            this.$emit('hideDialog');
            this.$router.push({name:'reset'});
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../styles/common.less';
.el-form {
    margin: 0 auto;
    .el-form-item {
        margin-bottom: 10px;
        .el-button {
            width: 100%;
        }
    }
    .forget{
        float: right;
        margin: 5px;
        cursor: pointer;
        &:hover{
            
            color: @color-active;
        }
    }
}
</style>