/*
 * @Description: 歌单模块的网络请求接口
 * @Author: Allen Tan
 * @Date: 2019-11-29 20:18:16
 * @LastEditors  : Allen Tan
 * @LastEditTime : 2020-01-04 09:15:43
 */

import axios from '@/utils/axios.js';
import {getServerURL} from '@/api/env.js';

const baseURL = getServerURL('python');
const qs = require('qs');

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

/**
 * @description: 创建歌单
 * @param {stags:标签拼接成的字符串;name:歌单名;description:简介;cimg:图片} 
 * @return: 
 */
export const createPlaylist = function(stags,name,description) {
  return axios({
    url: `${baseURL}/playlist/`,
    method: 'post',
    data: {
      stags,
      name,
      description
    }
  })
}

/**
 * @description: 添加歌曲到指定歌单
 * @param {tracks:新的歌单列表} 
 * @return: 
 */
export const addToPlaylist = function (lid,tracks) {
  return axios({
    url: `${baseURL}/playlist/${lid}/`,
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'patch',
    data: {
      tracks
    }
  })
}
