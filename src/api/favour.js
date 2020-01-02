/*
 * @Description: 收藏模块接口
 * @Author: Allen Tan
 * @Date: 2019-12-28 17:03:45
 * @LastEditors  : Allen Tan
 * @LastEditTime : 2020-01-02 11:05:16
 */

import axios from '@/utils/axios.js';
import {getServerURL} from '@/api/env.js';

const baseURL = getServerURL('python');

/**
 * @description: 收藏指定歌单
 * @param {playlist:歌单ID} 
 * @return: 
 */
export const collectPlaylist = function(playlist){
  return axios({
    url: `${baseURL}/playlistFav/`,
    method: 'post',
    data:{
      playlist
    }
  })
}

/**
 * @description: 收藏指定歌曲
 * @param {song:歌曲ID} 
 * @return: 
 */
export const collectSong = function (song) {
  return axios({
    url: `${baseURL}/songFav/`,
    method: 'post',
    data:{
      song
    }
  })
}