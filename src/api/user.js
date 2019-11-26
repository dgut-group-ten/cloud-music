import axios from '@/utils/axios.js';

export const register = function register({checkCode, email, user_name, user_password}) {
    console.log(checkCode, email, user_name, user_password);
    return axios({
        url: '/api/user',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
          },
        data: {
            checkCode,
            email,
            user_name,
            user_password
        }
    })
}


export const checkCode = function checkCode(to) {
    const url = '/api/email';
    return axios({
        url: url,
        method: 'post',
        data: {
            to
        }
    })
}

export const login = function login({user_name, user_password}) {
    return axios({
        url: '/api/user/token',
        method: 'post',
        data: {
            user_name,
            user_password
        }
    })
}