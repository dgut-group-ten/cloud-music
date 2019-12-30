/*
 * @Description: 收藏模块接口
 * @Author: Allen Tan
 * @Date: 2019-12-28 17:03:45
 * @LastEditors  : Allen Tan
 * @LastEditTime : 2019-12-28 17:10:56
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

export const collectSong = function (song) {
  return axios({
    url: `${baseURL}/songFav/`,
    method: 'post',
    data:{
      song
    }
  })
}