/*
 * @Description: 评论模块接口
 * @Author: Allen Tan
 * @Date: 2019-12-09 09:42:24
 * @LastEditors: Allen Tan
 * @LastEditTime: 2019-12-09 10:30:10
 */

import axios from '@/utils/axios.js';
import {getServerURL} from '@/api/env.js';

const baseURL = getServerURL('java');

/**
 * @description: 获取评论列表
 * @param {rid：资源的id,歌单或歌曲,page:第几页} 
 * @return: 指定资源的所有评论信息
 */
export const getComments = function(rid,p) {
  return axios({
    url: `${baseURL}/comment?rid=${rid}&type=1&p=${p}&ps=5`,
    method: 'get'
  })
}
