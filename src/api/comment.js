/*
 * @Description: 评论模块接口
 * @Author: Allen Tan
 * @Date: 2019-12-09 09:42:24
 * @LastEditors: Allen Tan
 * @LastEditTime: 2019-12-09 20:31:47
 */

import axios from '@/utils/axios.js';
import {getServerURL} from '@/api/env.js';

const baseURL = getServerURL('java');

/**
 * @description: 获取评论列表
 * @param {rid：资源的id,歌单或歌曲,page:第几页,ps:每页几条信息} 
 * @return: 指定资源的所有评论信息
 */
export const getComments = function(rid,page,ps) {
  return axios({
    url: `${baseURL}/comment?rid=${rid}&type=1&p=${page}&ps=${ps}`,
    method: 'get'
  })
}

/**
 * @description: 评论歌单
 * @param {content:评论内容,resourceId:歌单id} 
 * @return: 
 */
export const commentOnPlaylist = function(content,resourceId){
  return axios({
    url: `${baseURL}/comment`,
    method: 'post',
    data: {
      content,
      type:1,
      resourceId
    }
  })
}
