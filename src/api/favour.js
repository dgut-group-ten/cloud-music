/*
 * @Description: 收藏模块接口
 * @Author: Allen Tan
 * @Date: 2019-12-28 17:03:45
 * @LastEditors  : Allen Tan
 * @LastEditTime : 2020-01-02 20:38:37
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

/**
 * @description: 取消收藏的某首歌
 * @param {fid:歌曲的收藏ID} 
 * @return: 
 */
export const cancelFavSong = function(fid){
  return axios({
    url: `${baseURL}/songFav/${fid}/`,
    method: 'delete',
  })
}

/**
 * @description: 取消收藏的某个歌单
 * @param {fid:歌单的收藏ID} 
 * @return: 
 */
export const cancelFavPlaylist = function(fid){
  return axios({
    url: `${baseURL}/playlistFav/${fid}/`,
    method: 'delete',
  })
}

/**
 * @description: 删除自己上传歌曲
 * @param {id：要删除的歌曲ID} 
 * @return: 
 */
export const deleteOwnSong = function(sid){
  return axios({
    url: `${baseURL}/song/${sid}/`,
    method: 'delete',
  })
}

/**
 * @description: 删除自己上传歌单
 * @param {id：要删除的歌单ID} 
 * @return: 
 */
export const deleteOwnPlaylist = function(lid){
  return axios({
    url: `${baseURL}/playlist/${lid}/`,
    method: 'delete',
  })
}
