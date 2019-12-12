<template>
  <div>
    {{label}}{{text}}
  </div>
</template>

<script>
import {searchSongs} from '@/api/search.js';
export default {
  name:'Tab',
  data(){
    return {
      curList:null,
      playlist:null,
      total:null,
    }
  },
  props:['label','text'],
  created(){
    this.judgeSearchType(this.label);
  },
  methods:{
    // 判断搜索类型进行不同的搜索
    judgeSearchType(type){
      switch(type){
        case '单曲':
          searchSongs(this.text).then((res)=>{
            this.playlist = res.results;
          })
          break;
        case '歌单':
          break;
        case '用户':
          break;
      }
    }
  }
}

</script>
<style scoped lang='less'>
</style>