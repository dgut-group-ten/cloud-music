<template>
  <div v-if="songInfo" class="player">
    <!-- 播放标签，隐藏 -->
    <audio id="audio" controls="controls" autoplay="autoplay" style="display:none;">
      <source :src="songInfo.file" type="audio/mpeg" />
      您的浏览器不支持 audio 标签。
    </audio>
    <!-- 主体部分 -->
    <div class="player-main">
      <!-- 返回键 -->
      <div class="back" @click="back">QO音乐</div>
      <!-- 播放控制面板 -->
      <div class="player-panel">
        <img class="song-avatar" :src="songInfo.cimg" alt="">
        <div class="song-name">{{songInfo.name}}</div>
        <div class="song-author">{{songInfo.authors[0].name}}</div>
        <el-button class="btn" @click="contorl">{{textMapping(isPlaying)}}</el-button>
      </div>
    </div>
    <div class="player-bg_mask"></div>
    <!-- 背景 -->
    <div class="player-bg" :style="{backgroundImage: 'url(' + songInfo.cimg + ')'}">
    </div>
  </div>
</template>

<script>
import {getSingleSong} from '@/api/playlist.js';
export default {
  name: 'Player',
  data() {
    return {
      songInfo:null,
      isPlaying: true,
    }
  },
  created() {
    let sid = this.$route.query.sid;
    getSingleSong(sid).then((res)=>{
      this.songInfo = res;
      console.log(res)
    }) 
  },
  methods:{
    contorl(){
      let audio = document.querySelector('#audio');
      this.isPlaying = !this.isPlaying;
      if (audio.paused) {
        audio.play();
      } else{
        audio.pause();
      }
    },
    textMapping(val){
      if(val){
        return '暂停';
      } else {
        return '播放';
      }
    },
    back(){
      this.$router.back(-1);
    }
  }
}
</script>
<style scoped lang='less'>
@import '../styles/common.less';
  .player{
    .player-main{
      height: 100%;
      width: 100%;
      position: relative;
      z-index: 3;
      .back{
        margin-top: 5px;
        margin-left: 15px;
        line-height: 1.8;
        font-size: @fs-xxl;
        color:@player-sub-color;
        &:hover{
          color:@color;
          cursor: pointer;
        }
      }
      .player-panel{
        width: 654px;
        height: 252px;
        margin: 0 auto;
        margin-top: 30px;
        background:@color;
        .song-avatar{
          float: right;
          margin-top: 5px;
          margin-right: 5px;
          width:242px;
          height: 242px;
          object-fit: cover;
        }
      } 
    }
    .player-bg_mask{
      width:100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,.35);
      z-index: 2;
    }
    .player-bg{
      width:100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      filter: blur(65px);
      opacity: .6;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    
  }
</style>