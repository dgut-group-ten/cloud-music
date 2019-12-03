<template>
  <div v-if="songInfo">
    <audio id="audio" controls="controls" autoplay="autoplay" style="display:none;">
      <source :src="songInfo.file" type="audio/mpeg" />
      您的浏览器不支持 audio 标签。
    </audio>
    <el-button @click="contorl">{{textMapping(isPlaying)}}</el-button>
  </div>
</template>

<script>
import {getSingleSong} from '@/api/playlist.js';
export default {
  name: 'Player',
  data() {
    return {
      songInfo:null,
      isPlaying: true
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
    }
  }
}

</script>
<style scoped lang='less'>
</style>