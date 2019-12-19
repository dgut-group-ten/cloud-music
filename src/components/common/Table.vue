<template>
  <div>
    <el-table :data="list" stripe 
      @cell-mouse-enter="showBtnGroup" @cell-mouse-leave="hideBtnGroup">
      <el-table-column type="index" :index="indexMethod" width="80"></el-table-column>
      <el-table-column v-if="title[1] === '创建者'" prop="cimg" label="封面" min-width="30" >
        <!-- 图片的显示 -->
        <template slot-scope="scope">            
          <img :src="scope.row.cimg" min-width="70" height="70" />
        </template>         
      </el-table-column> 
      <el-table-column prop="name" :label="title[0]" :width="width"></el-table-column>
      <el-table-column :prop="prop" :label="title[1]"></el-table-column>
      <!-- 按钮组 -->
      <el-table-column :label="title[2]">
        <div class="hide">
          <el-button  v-if="title[1] === '创建者'" title="查看详情" icon="el-icon-magic-stick" circle @click="checkDetails($event)"></el-button> 
          <el-button title="播放" icon="el-icon-caret-right" circle @click="play($event)"></el-button>
          <el-button  v-if="title[1] !== '创建者'" title="添加到歌单" icon="el-icon-plus" circle></el-button>
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
      list:null,
    }
  },
  props:['curList','playlist','total','title','prop','width'],
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
      cell.parentNode.lastChild.children[0].children[0].classList.remove('hide');
    },
    // 隐藏按钮组
    hideBtnGroup(row, column, cell, event){
      cell.parentNode.lastChild.children[0].children[0].classList.add('hide');
    },
    // 获取点击的索引
    getIndex(e){
      let td = e.currentTarget.parentNode.parentNode.parentNode;
      let tr = td.parentNode;
      let index = tr.children[0].children[0].children[0].innerHTML;

      return index;
    },
    // 播放
    play(e){
      let index = this.getIndex(e);

      if(this.title[1] === '歌手') {
        this.playSong(index);
      } else {
        this.playPlaylist(index);
      }
    },
    // 播放歌曲
    playSong(index){
      let sid;
      if(this.playlist.tracks){
        sid = this.playlist.tracks[index-1].sid;
      }  else {
        sid = this.playlist.results[index-1].sid;
      }

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
    // 播放歌单
    playPlaylist(index){
      // 准备歌单
      let newList = this.playlist.results[index-1].tracks;

      // 判断是否已经打开播放器
      let flag = window.localStorage.getItem('hasPlayerPage');
      if(!flag){
        // 标记已生成播放器
        window.localStorage.setItem('hasPlayerPage',true);
        // 生成播放器并打开
        let sid = newList.shift();
        // 生成所需播放歌单
        window.localStorage.setItem('playlist',JSON.stringify(newList));
        const newTab = this.$router.resolve({name:'player', query: {sid}});
        window.open(newTab.href,'_blank');
      } else {
        // 生成所需播放歌单
        window.localStorage.setItem('playlist',JSON.stringify(newList));
      }
    },
    // 查看歌单详情
    checkDetails(e){
      let index = this.getIndex(e);
      let lid = this.playlist.results[index-1].lid;
      this.$router.push({name:'detail',query: {lid}});
    }
  },
  watch: {
    curPage(newValue, oldValue){
      if(this.playlist.tracks){
        this.list = this.playlist.tracks.slice((newValue-1)*10,newValue*10) 
      } else {
        this.list = this.playlist.results.slice((newValue-1)*10,newValue*10);
      }
    }
  },
}

</script>
<style lang='less'>
  .el-table-column .el-button{
    margin: 0;
  }
  .el-table__body tr,
  .el-table__body td {
    height: 66px;
  }
  .hide{
    display: none;
  }
  .detail-pagination{
    margin: 20px 0;
    text-align: center;
  }
</style>