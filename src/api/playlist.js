import axios from '@/utils/axios.js';

const baseURL = 'http://music.niracler.com:8002';

export const getPlaylistByTagName = function (name) {
  return axios({
    url: `${baseURL}/playlist/?tags=${name}&ps=8`,
    method: 'get'
  })
}

export const getPlaylistDetailByLid = function(lid) {
  return axios({
    url: `${baseURL}/playlist/${lid}`,
    method: 'get'
  })
}