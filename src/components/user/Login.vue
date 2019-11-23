<template>
    <el-form :model="userInfo">
        <el-form-item>
            <el-input v-model="userInfo.user_name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="userInfo.user_password" placeholder="密码"></el-input>
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
                user_name: '',
                user_password: ''
            }
        }
    },
    methods: {
        _login() {
            login(this.userInfo).then(res => {
                console.log(res);
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