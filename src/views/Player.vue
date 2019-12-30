<template>
  <div v-if="songInfo" class="player">
    <!-- 播放标签，隐藏 -->
    <audio id="audio" controls="controls" autoplay="autoplay" style="display:none;" :src="songInfo.file"></audio>
    <!-- 主体部分 -->
    <div class="player-main">
      <!-- 返回键 -->
      <div class="back" @click="back">QO音乐</div>
      <!-- 播放控制面板 -->
      <div class="player-panel" v-loading="!percentage">
        <img class="song-avatar" :src="songInfo.cimg" alt="">
        <div class="song-info">
          <div class="song-name" :title="songInfo.name">{{songInfo.name}}</div>
          <div class="song-author">{{songInfo.authors[0].name}}</div>
        </div>
        <!-- 播放进度条 -->
        <div class="song-progress">
          <span>{{timeFormat(currentTime)}}</span>
          <el-progress v-if="percentage" :percentage="percentage" color="#909399" :show-text="false" :stroke-width="1"></el-progress>
          <span>{{timeFormat(duration)}}</span>
        </div>
        <!-- 按钮 -->
        <div class="song-control">
          <a class="song-control_item" @click="contorlPlay" href="javascript:;" title="暂停">
            <i class="icon-pause"></i>
          </a>
          <a class="song-control_item" @click="playNext" href="javascript:;" title="下一首">
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
              :step="0.001"></el-slider>
          </div>
          <div class="right-part">
            <a class="song-control_item" href="javascript:;" title="喜欢" @click="handleFavour">
              <i class="icon-like"></i>
            </a>
            <a class="song-control_item" href="javascript:;" title="更多">
              <i class="icon-more"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- 歌词区域 -->
      <ul class="lyric"> 
      </ul>
    </div>
    <div class="player-bg_mask"></div>
    <!-- 背景 -->
    <div class="player-bg" :style="{backgroundImage: 'url(' + songInfo.cimg + ')'}">
    </div>
  </div>
</template>

<script>
import {getSingleSong} from '@/api/playlist.js';
import {collectSong} from '@/api/favour.js';
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
      ismuted:false,
      lineNo:0
    }
  },
  created() {
    const that = this;
    let sid = that.$route.query.sid;
    getSingleSong(sid).then((res)=>{
      that.loadMusic(res);
    })

    // 监听storge的变化
    window.addEventListener('storage', function(se) {
      const key = se.key;
      // 判断是否有新歌曲加入播放器
      if(key === 'playlist'){
        let newList = JSON.parse(se.newValue);
        let sid = newList.shift();
        getSingleSong(sid).then((res)=>{
          that.loadMusic(res);
          window.localStorage.setItem('playlist',JSON.stringify(newList));
        })
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
    // 加载音乐
    loadMusic(res){
      const that = this;
      that.songInfo = res;
      // 异步执行，确保获得歌曲信息后再去获取dom结点
      setTimeout(()=>{
        let audio = document.querySelector('#audio');
        // 设置src
        audio.src = res.file;
        // 必须要在oncanplay中调用才能获得duration的值
        audio.oncanplay = function () {
          that.duration = audio.duration;
        }
        that.lineNo = 0;
        document.querySelector('.lyric').scrollTop=0;
        // 监听时间变化，提供参数给进度条使用
        audio.addEventListener("timeupdate",function(){
          that.currentTime = audio.currentTime;
          that.percentage = audio.currentTime/audio.duration*100;
          if(that.currentTime === that.duration) {
            that.playNext();
          }

          let lrc = that.songInfo.lyric;
          if(lrc.length !== 0) {
              if (that.lineNo === lrc.length - 1 && audio.currentTime >= lrc[that.lineNo].time) {
              that.highlight(that.lineNo);
            }
            if (lrc[that.lineNo].time <= audio.currentTime && audio.currentTime <= lrc[that.lineNo + 1].time) {
              that.highlight(that.lineNo);
              that.lineNo++;
            }
          }
        })
        // 初始化音量
        audio.volume = 0.3;

        //清空原有的歌词，生成新歌词
        let ul = document.querySelector('.lyric');
        ul.innerHTML='';
        that.createLrc(res.lyric);

        // 动态修改页面title
        document.title = `${this.songInfo.name}-${this.songInfo.authors[0].name} 正在播放`;
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
      if (this.ismuted) {
        this.ismuted = false;
        audio.muted = false;
        e.currentTarget.children[0].classList.replace('icon-mute','icon-volume');
        e.currentTarget.title = '关闭声音'; 
      } else{
        this.ismuted = true;
        audio.muted = true;
        e.currentTarget.children[0].classList.replace('icon-volume','icon-mute');
        e.currentTarget.title = '打开声音';
      }
    },
    // 播放下一首
    playNext(){
      let newList = JSON.parse(window.localStorage.getItem('playlist'));
      if(!newList){
        this.$message('没有下一首啦，去添加新的歌曲吧！');
        return;
      }
      let sid = newList.shift();
      getSingleSong(sid).then((res)=>{
        this.loadMusic(res);
        window.localStorage.setItem('playlist',JSON.stringify(newList));
      })
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
    },
    // 生成歌词
    createLrc(lrc){
      let ul = document.querySelector('.lyric');
      let li = null;

      if(lrc.length === 0){
        li = document.createElement('li');
        li.innerHTML='该歌曲为纯音乐，木有歌词';
        ul.appendChild(li);
        return;
      }
      lrc.forEach((item)=>{
        li = document.createElement('li');
        li.innerHTML=item.text;
        ul.appendChild(li);
      })
    },
    // 高亮歌词行
    highlight(lineNo){
      let ul = document.querySelector('.lyric');
      // 去除原高亮行的样式,为指定行添加内联样式
      if(lineNo > 0) {
        ul.children[lineNo-1].style.color='#e9e4e9';
      }
      let nowline = ul.children[lineNo];
      nowline.style.color='#c40b0b';

      if(nowline.offsetTop-ul.scrollTop>544){
        ul.scrollTop += 168;
      }
    },
    // 收藏歌曲
    handleFavour() {
      collectSong(this.songInfo.sid)
      .then(()=>{
        this.$message({
          message: '收藏成功',
          type: 'success'
        });
      })
      .catch(err=>{
        this.$message.error(err.response.data.non_field_errors[0]);
      })
    }
  },
  watch:{
    volume(newValue){
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
            width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: @fs-l;
            line-height: 1.5;
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
            transition: opacity 1s;
          }
        }
        .song-control{
          margin-top: 20px;
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
      .lyric{
        margin: 0 auto;
        margin-top: 50px;
        width:654px;
        height: 200px;
        text-align: center;
        overflow: hidden;
        font-size: @fs;
        color: #e9e4e9;
        line-height: 1.5;
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