/*
 * @Description: 环境配置
 * @Author: Allen Tan
 * @Date: 2019-12-05 09:30:08
 * @LastEditors  : Allen Tan
 * @LastEditTime : 2020-01-02 22:08:51
 */

const curEnv = 'dev';
// const curEnv = 'prod';

const serverInfo = {
  prod:'music',
  dev:'music-01',
  python:'8002',
  java:'8001'
}

/**
 * @description: 返回服务器地址
 * @param {lan:后端使用的语言，java|python} 
 * @return: 服务器地址
 */
export const getServerURL = function (lan) {
  return `https://${serverInfo[curEnv]}.niracler.com:${serverInfo[lan]}`
}
