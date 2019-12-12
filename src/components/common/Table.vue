<template>
  <div>
    <el-table :data="list" stripe 
      @cell-mouse-enter="showBtnGroup" @cell-mouse-leave="hideBtnGroup">
      <el-table-column type="index" :index="indexMethod" width="80"></el-table-column>
      <el-table-column prop="name" label="歌曲" width="300"></el-table-column>
      <el-table-column prop="authors[0].name" label="歌手"></el-table-column>
      <!-- 按钮组 -->
      <el-table-column label="操作">
        <div class="hide">
          <el-button title="播放" icon="el-icon-caret-right" circle @click="playSong($event)"></el-button>
          <el-button title="添加到歌单" icon="el-icon-plus" circle></el-button>
          <el-button title="下载" icon="el-icon-download" circle></el-button>
          <el-button title="分享" icon="el-icon-share" circle></el-button>
        </div>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total > 10"
      class="detail-pagination"
      background
      layout="prev, pager, next"
      :pager-count="5"
      :page-size="10"
      :total="total"
      :current-page.sync="curPage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name:'Table',
  data(){
    return{
      curPage: 1,
      list:null
    }
  },
  props:['curList','playlist','total'],
  created(){
    this.list = this.curList;
  },
  methods:{
    // 生成歌单序号
    indexMethod(index) {
      return (this.curPage-1)*10+index + 1;
    },
    // 显示按钮组
    showBtnGroup(row, column, cell, event){
      cell.parentNode.children[3].children[0].children[0].classList.remove('hide');
    },
    // 隐藏按钮组
    hideBtnGroup(row, column, cell, event){
      cell.parentNode.children[3].children[0].children[0].classList.add('hide');
    },
    // 播放歌曲
    playSong(e){
      let td = e.currentTarget.parentNode.parentNode.parentNode
      let tr = td.parentNode;
      let index = tr.children[0].children[0].children[0].innerHTML;
      let sid = this.playlist.tracks[index-1].sid || this.playlist.results[index-1].sid;

      // 判断是否已经打开播放器
      let flag = window.localStorage.getItem('hasPlayerPage');
      if(!flag){
        // 标记已生成播放器
        window.localStorage.setItem('hasPlayerPage',true);
        // 生成播放器并打开
        const newTab = this.$router.resolve({name:'player', query: {sid}});
        window.open(newTab.href,'_blank');
      } else {
        this.$message('所选歌曲已经加入播放器');
        // 将该歌曲添加到播放器,插队播放
        let playlist =  JSON.parse(window.localStorage.getItem('playlist')) || [];
        playlist.unshift(sid);
        window.localStorage.setItem('playlist',JSON.stringify(playlist));
      }
    },
  },
  watch: {
    curPage(newValue, oldValue){
      this.list = this.playlist.tracks.slice((newValue-1)*10,newValue*10) || this.playlist.results.slice((newValue-1)*10,newValue*10);
    }
  },
}

</script>
<style scoped lang='less'>
  .el-table-column .el-button{
    margin: 0;
  }
  .hide{
    display: none;
  }
  .detail-pagination{
    margin-top: 20px;
    text-align: center;
  }
</style>