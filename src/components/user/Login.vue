<template>
    <el-form :model="userInfo">
        <el-form-item>
            <el-input v-model="userInfo.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="userInfo.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="_login" type="primary">登录</el-button>
        </el-form-item>
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
            const that = this;
            login(that.userInfo).then(res => {
                const {token, message} = res;
                console.log(res);
                console.log(token);
                sessionStorage.setItem("token", token);
                that.$message({
                    message,
                    type: 'success'
                });
                that.$emit('hideDialog');
            })
        }
    }
}
</script>

<style lang="less" scoped>
.el-form {
    margin: 0 auto;
    .el-form-item {
        margin-bottom: 10px;
        .el-button {
            width: 100%;
        }
    }
}
</style>