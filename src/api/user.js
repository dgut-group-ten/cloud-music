/*
 * @Description: 用户模块接口
 * @Author: Fang yong
 * @Date: 2019-11-29 11:35:01
 * @LastEditors  : Allen Tan
 * @LastEditTime : 2019-12-19 19:35:06
 */
import axios from '@/utils/axios.js';
import {getServerURL} from '@/api/env.js';

const javaEndURL = getServerURL('java');
const pythonEndURL = getServerURL('python');

export const register = function register({checkCode, email, name, password}) {
    return axios({
        url: `${javaEndURL}/user`,
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
    const url = `${javaEndURL}/email`;
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
        url: `${javaEndURL}/user/token`,
        method: 'post',
        data: {
            name,
            password
        }
    })
}

export const getUserInfo = function(name){
    return axios({
        url: `${javaEndURL}/user/${name}`,
        method: 'get'
    })
}

/**
 * @description: 查询用户喜欢的歌曲
 * @param {p:第几页;ps:每一页的长度} 
 * @return: 喜欢歌曲的列表
 */
export const getUserSongs = function(p=1,ps=10){
    return axios({
        url: `${pythonEndURL}/song/?p=${p}&ps=${ps}`,
        method: 'get'
    })
}