/*
 * @Description: 歌单模块的网络请求接口
 * @Author: Allen Tan
 * @Date: 2019-11-29 20:18:16
 * @LastEditors  : Allen Tan
 * @LastEditTime : 2020-01-02 11:18:10
 */

import axios from '@/utils/axios.js';
import {getServerURL} from '@/api/env.js';

const baseURL = getServerURL('python');

/**
 * @description: 根据标签名获取歌单列表
 * @param { name: 标签名} 
 * @return: 歌单列表（含多个歌单）
 */
export const getPlaylistByTagName = function (name,ordering) {
  return axios({
    url: `${baseURL}/playlist/?tags=${name}&ps=8&ordering=${ordering}`,
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

/**
 * @description: 根据歌曲id获得该歌曲的详情
 * @param {sid: 歌曲ID} 
 * @return: 歌曲详细信息
 */
export const getSingleSong = function(sid) {
  return axios({
    url: `${baseURL}/song/${sid}`,
    method: 'get'
  })
}