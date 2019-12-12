<template>
  <div>
    <Table v-if="curList" 
    :curList='curList' 
    :playlist="playlist" 
    :total="total" 
    :title="title" 
    :prop="prop" 
    :width="400"></Table>
  </div>
</template>

<script>
import {searchSongs, searchPlaylists} from '@/api/search.js';
import Table from '@/components/common/Table.vue';
export default {
  name:'Tab',
  data(){
    return {
      curList:null,
      playlist:null,
      total:null,
      title: null,
      prop:null,
    }
  },
  components:{
    Table
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
            this.playlist = res;
            this.total = res.count;
            this.curList = this.playlist.results.slice(0,10);
            this.title = ['歌曲','歌手','操作'];
            this.prop = 'authors[0].name';
          })
          break;
        case '歌单':
          searchPlaylists(this.text).then((res)=>{
            this.playlist = res;
            this.total = res.count;
            this.curList = this.playlist.results.slice(0,10);
            this.title = ['歌单','创建者','操作'];
            this.prop = 'creator';
          })
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