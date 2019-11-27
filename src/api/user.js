import axios from '@/utils/axios.js';

const baseURL = 'http://music.niracler.com:8001';

export const register = function register({checkCode, email, name, password}) {
    console.log(checkCode, email, name, password);
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