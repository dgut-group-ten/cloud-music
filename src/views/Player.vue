<template>
  <div v-if="songInfo" class="player">
    <!-- 播放标签，隐藏 -->
    <audio id="audio" controls="controls" autoplay="autoplay" style="display:none;" :src="songInfo.file"></audio>
    <!-- 主体部分 -->
    <div class="player-main">
      <!-- 返回键 -->
      <div class="back" @click="back">QO音乐</div>
      <!-- 播放控制面板 -->
      <div class="player-panel">
        <img class="song-avatar" :src="songInfo.cimg" alt="">
        <div class="song-info">
          <div class="song-name">{{songInfo.name}}</div>
          <div class="song-author">{{songInfo.authors[0].name}}</div>
        </div>
        <!-- 播放进度条 -->
        <div class="song-progress">
          <span>{{timeFormat(currentTime)}}</span>
          <el-progress :percentage="percentage" color="#909399" :show-text="false" :stroke-width="1"></el-progress>
          <span>{{timeFormat(duration)}}</span>
        </div>
        <!-- 按钮 -->
        <div class="song-control">
          <a class="song-control_item" @click="contorlPlay" href="javascript:;" title="暂停">
            <i class="icon-pause"></i>
          </a>
          <a class="song-control_item" href="javascript:;" title="下一首">
            <i class="icon-next"></i>
          </a>
          <a class="song-control_item" @click="contorlVolume" href="javascript:;" title="关闭声音">
            <i class="icon-volume"></i>
          </a>
          <div class="volume">
            <el-slider 
              v-model="volume" 
              :show-tooltip="false" 
              :min="0" 
              :max="1" 
              :step="0.001"
              :disabled="!canAdjustVol"></el-slider>
          </div>
          <div class="right-part">
            <a class="song-control_item" href="javascript:;" title="喜欢">
              <i class="icon-like"></i>
            </a>
            <a class="song-control_item" href="javascript:;" title="删除">
              <i class="icon-delete"></i>
            </a>
            <a class="song-control_item" href="javascript:;" title="更多">
              <i class="icon-more"></i>
            </a>
          </div>
        </div>
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
import { watch } from 'fs';
export default {
  name: 'Player',
  data() {
    return {
      songInfo:null,
      currentTime:null,
      duration: null,
      percentage:0,
      volume:0.3,
      volumeCopy:0.3,
      canAdjustVol:true
    }
  },
  created() {
    let sid = this.$route.query.sid;
    getSingleSong(sid).then((res)=>{
      this.loadMusic(res);
    })

    // 监听storge的变化
    window.addEventListener('storage', function(se) {
      const key = se.key;
      // 判断是否有新歌曲加入播放器
      if(key === 'playlist'){
        console.log(se);
        // getSingleSong(se.newValue).then((res)=>{
        //   this.loadMusic(res);
        //   let newlist = window.localStorage.getItem('playlist').shift();
        //   window.localStorage.setItem('playlist',newlist);
        // })
      }
    })
    // 在页面关闭前清除localstorge中的播放信息
    window.onbeforeunload = function (){
      this.clear();
    }
  },
  methods:{
    // 回到首页
    back(){
      this.clear();
      this.$router.push({name:'main'});
    },
    // 清除播放器在本地缓存
    clear() {
      window.localStorage.removeItem('hasPlayerPage');
      window.localStorage.removeItem('playlist');
    },
    loadMusic(res){
      this.songInfo = res;
      console.log('res',res);
      // 异步执行，确保获得歌曲信息后再去获取dom结点
      const that = this;
      setTimeout(()=>{
        let audio = document.querySelector('#audio');
        // 必须要在oncanplay中调用才能获得duration的值
        audio.oncanplay = function () {
          that.duration = audio.duration;
        }
        // 监听时间变化，提供参数给进度条使用
        audio.addEventListener("timeupdate",function(){
          that.currentTime = audio.currentTime;
          that.percentage = audio.currentTime/audio.duration*100;
        })
        // 初始化音量
        audio.volume = 0.3;
      },20);
    },
    // 控制播放
    contorlPlay(e){
      let audio = document.querySelector('#audio');
      if (audio.paused) {
        audio.play();
        e.currentTarget.children[0].classList.replace('icon-play','icon-pause');
        e.currentTarget.title = '暂停'; 
      } else{
        audio.pause();
        e.currentTarget.children[0].classList.replace('icon-pause','icon-play');
        e.currentTarget.title = '播放';
      }
    },
    // 控制音量
    contorlVolume(e){
      let audio = document.querySelector('#audio');
      if (!this.canAdjustVol) {
        this.canAdjustVol = true;
        audio.volume = this.volumeCopy;
        e.currentTarget.children[0].classList.replace('icon-mute','icon-volume');
        e.currentTarget.title = '关闭声音'; 
      } else{
        this.canAdjustVol = false;
        this.volumeCopy = audio.volume;
        audio.volume = 0;
        e.currentTarget.children[0].classList.replace('icon-volume','icon-mute');
        e.currentTarget.title = '打开声音';
      }
    },
    // 时间格式化
    timeFormat(seconds){
      let m = seconds/60|0;
      let s = (seconds - m * 60)|0;
      if(m<10){
        m='0'+m;
      }
      if(s<10){
        s='0'+s;
      }
      return `${m}:${s}`;
    }
  },
  watch:{
    volume(newValue, oldValue){
      let audio = document.querySelector("#audio");
      audio.volume = newValue; 
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
        display:inline-block;
        width:80px;
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
        .song-info{
          padding-top: 20px;
          margin-left: 20px;
          .song-name{
            font-size: @fs-l;
          }
          .song-author{
            margin-left: 1px;
            margin-top: 15px;
            font-size: @fs-s;
            font-weight: @fw-l;
          }
        }
        .song-progress{
          margin-top: 100px;
          margin-left: 18px;
          span{
            font-size: @fs-s;
            vertical-align: middle;
          }
          .el-progress{
            display: inline-block;
            margin-left: 8px;
            margin-right: 8px;
            width:280px;
            transform:translate(0,-2px);
          }
        }
        .song-control{
          margin-top: 25px;
          margin-left: 18px;
          .song-control_item i{
            margin-right: 18px;
            font-size: @fs-xxl;
            color:@player-contorl-color;
          }
          & > a:nth-child(1) i{
            margin-right: 12px;
          }
          .volume{
            display: inline-block;
            transform: translate(0, -5px);
            height: 23px;
            width: 80px;
          }
          .right-part{
            float: right;
            .song-control_item i{
              margin-right: 15px;
            }
            & > a:nth-child(1) i{
              margin-right: 20px;
            }
          }
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