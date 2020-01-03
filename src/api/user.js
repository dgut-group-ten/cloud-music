/*
 * @Description: 用户模块接口
 * @Author: Fang yong
 * @Date: 2019-11-29 11:35:01
 * @LastEditors  : Allen Tan
 * @LastEditTime : 2020-01-02 20:28:54
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

export const getCheckCode = function (to) {
    const url = `${javaEndURL}/email`;
    return axios({
        url: url,
        method: 'put',
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
 * @description: 查询用户上传的歌曲
 * @param {p:第几页;ps:每一页的长度} 
 * @return: 上传歌曲的列表
 */
export const getUserUploadedSongs = function(p=1,ps=10){
    return axios({
        url: `${pythonEndURL}/song/?p=${p}&ps=${ps}`,
        method: 'get'
    })
}

/**
 * @description: 查询用户喜欢的歌曲
 * @param {p:第几页;ps:每一页的长度} 
 * @return: 喜欢歌曲的列表
 */
export const getUserFavouriteSongs = function(p=1,ps=10){
    return axios({
        url: `${pythonEndURL}/songFav/?p=${p}&ps=${ps}`,
        method: 'get'
    })
}

/**
 * @description: 查询用户喜欢的歌单
 * @param {p:第几页;ps:每一页的长度} 
 * @return: 喜欢歌曲的列表
 */
export const getUserFavouritePlaylists = function(p=1,ps = 10) {
    return axios({
        url: `${pythonEndURL}/playlistFav/?p=${p}&ps=${ps}`,
        method: 'get'
    }) 
}

/**
 * @description: 查询用户创建的歌单
 * @param {p:第几页;ps:每一页的长度} 
 * @return: 喜欢歌曲的列表
 */
export const getUserCreatedPlaylist =function(p=1,ps = 10) {
    return axios({
        url: `${pythonEndURL}/playlist/?p=${p}&ps=${ps}`,
        method: 'get'
    })
}

/**
 * @description: 修改用户密码
 * @param {oldPassword:旧密码;newPassword:新密码}} 
 * @return: 
 */
export const modifyPassword = function(oldPassword,newPassword) { 
    return axios({
        url: `${javaEndURL}/user/changePassword`,
        method: 'put',
        data: {
            oldPassword,
            newPassword
        }
    })
}

/**
 * @description: 修改认证邮箱
 * @param {newEmail:绑定的新邮箱,checkCode：验证码} 
 * @return: 
 */
export const modifyMail = function(newEmail,checkCode){
    return axios({
        url: `${javaEndURL}/user/rebind`,
        method: 'put',
        data: {
            newEmail,
            checkCode
        }
    })
}

/**
 * @description: 忘记密码时修改密码
 * @param {name：名字,email:邮箱,checkCode:验证码,newPassword:密码} 
 * @return: 
 */
export const modifyPassWhenForgot = function(name,email,checkCode,newPassword){
    return axios({
        url: `${javaEndURL}/user/forgotPassword`,
        method: 'put',
        data: {
            name,
            email,
            checkCode,
            newPassword
        }
    })
}