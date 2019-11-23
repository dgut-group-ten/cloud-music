import axios from 'axios';

const service = axios.create({
  timeout: 10000
});

service.interceptors.request.use(
  config => {
    // 做登录过滤 若未登录 则跳到登录页面
    //
    config.transformRequest = [
      data => {
        let ret = '';
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        }
        return ret.substr(0, ret.length - 1);
      }
    ];

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    // 根据状态码 统一提示处理
    return res;
  },
  error => {
    //  做一些错误提示
    return Promise.reject(error.response);
  }
);

export default service;
