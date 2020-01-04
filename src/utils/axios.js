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
        if(data&&data.hasOwnProperty("tracks")){
          console.log(JSON.stringify(data));
          return JSON.stringify(data);
        }
        let ret = '';
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        }
        return ret.substr(0, ret.length - 1);
      }
    ];

    // 根据条件加入token-安全携带
    let userInfo
    if(JSON.parse(window.localStorage.getItem('state'))){
      userInfo = JSON.parse(window.localStorage.getItem('state')).userInfo;
    }
    // 如果登录后，让每个请求携带token
    if (userInfo) { 
      config.headers['Token'] = userInfo.Token;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    // 判断状态码是否2开头
    let code = response.status/100|0;
    if (code !== 2) {
      // 返回异常
      return Promise.reject({
        status: response.status,
        message: res.message
      });
    } else {
      return response.data;
    }
  },
  error => {
    //  做一些错误提示
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
            error.message = '错误请求';
            break;
        case 401:
            error.message = '未授权，请重新登录';
            break;
        case 403:
            error.message = '拒绝访问';
            break;
        case 404:
            error.message = '请求错误,未找到该资源';
            break;
        case 405:
            error.message = '请求方法未允许';
            break;
        case 408:
            error.message = '请求超时';
            break;
        case 500:
            error.message = '服务器端出错';
            break;
        case 501:
            error.message = '网络未实现';
            break;
        case 502:
            error.message = '网络错误';
            break;
        case 503:
            error.message = '服务不可用';
            break;
        case 504:
            error.message = '网络超时';
            break;
        case 505:
            error.message = 'http版本不支持该请求';
            break;
        default:
              error.message = `未知错误${error.response.status}`;
      }
      } else {
        error.message = "连接到服务器失败";
      }
      return Promise.reject(error);
  }
);

export default service;
