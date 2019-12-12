/*
 * @Description: 搜索模块接口
 * @Author: Allen Tan
 * @Date: 2019-12-12 15:39:21
 * @LastEditors: Allen Tan
 * @LastEditTime: 2019-12-12 20:14:30
 */

import axios from '@/utils/axios.js';
import {getServerURL} from '@/api/env.js';

const javaEndURL = getServerURL('java');
const pythonEndURL = getServerURL('python');

/**
 * @description: 根据关键字搜索单曲
 * @param {search:关键字} 
 * @return: 和关键字有关的单曲列表
 */
export const searchSongs = function(search){
  return axios({
    url: `${pythonEndURL}/song/?search=${search}&ps=300`,
    method: 'get'
  })
}

/**
 * @description: 根据关键字搜索歌单
 * @param {search:关键字} 
 * @return: 和关键字有关的歌单列表
 */
export const searchPlaylists = function(search){
  return axios({
    url: `${pythonEndURL}/playlist/?search=${search}&ps=300`,
    method: 'get'
  })
}

