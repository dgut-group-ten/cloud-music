/*
 * @Description: 用户模块接口
 * @Author: Fang yong
 * @Date: 2019-11-29 11:35:01
 * @LastEditors: Allen Tan
 * @LastEditTime: 2019-12-17 20:49:53
 */
import axios from '@/utils/axios.js';
import {getServerURL} from '@/api/env.js';

const baseURL = getServerURL('java');

export const register = function register({checkCode, email, name, password}) {
    return axios({
        url: `${baseURL}/user`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            checkCode,
            email,
            name,
            password
        }
    })
}


export const checkCode = function checkCode(to) {
    const url = `${baseURL}/email`;
    return axios({
        url: url,
        method: 'post',
        data: {
            to
        }
    })
}

export const login = function login({name, password}) {
    return axios({
        url: `${baseURL}/user/token`,
        method: 'post',
        data: {
            name,
            password
        }
    })
}

export const getUserInfo = function(name){
    return axios({
        url: `${baseURL}/user/${name}`,
        method: 'get'
    })
}