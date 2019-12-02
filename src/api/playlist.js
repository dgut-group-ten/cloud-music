/*
 * @Description: 歌单模块的网络请求接口
 * @Author: Allen Tan
 * @Date: 2019-11-29 20:18:16
 * @LastEditors: Allen Tan
 * @LastEditTime: 2019-12-02 11:16:47
 */

import axios from '@/utils/axios.js';

const baseURL = 'https://music.niracler.com:8002';

/**
 * @description: 根据标签名获取歌单列表
 * @param { name: 标签名} 
 * @return: 歌单列表（含多个歌单）
 */
export const getPlaylistByTagName = function (name) {
  return axios({
    url: `${baseURL}/playlist/?tags=${name}&ps=8`,
    method: 'get'
  })
}


/**
 * @description: 根据歌单ID获得单个歌单的详情
 * @param {lid:歌单ID} 
 * @return: 单个歌单的所有信息
 */
export const getPlaylistDetailByLid = function(lid) {
  return axios({
    url: `${baseURL}/playlist/${lid}`,
    method: 'get'
  })
}