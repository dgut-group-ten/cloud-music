<template>
  <div class="wrapper">
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @cell-mouse-enter="showBtnGroup"
      @cell-mouse-leave="hideBtnGroup"
      @selection-change="handleSelectionChange">
      <el-table-column
        v-if="isSelection" 
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        :index="indexMethod"
        width="100">
      </el-table-column>
      <el-table-column label="封面" min-width="30" width="150">
        <!-- 图片的显示 -->
        <template slot-scope="scope">            
          <img :src="scope.row.cimg" min-width="70" height="70" />
        </template>         
      </el-table-column>
      <el-table-column
        v-if="type === 'favour' || type === 'upload'"
        prop="name"
        label="歌曲"
        width="320">
      </el-table-column>
      <el-table-column
        v-else
        prop="name"
        label="歌曲"
        width="320">
        <!-- 格式化为链接 -->
        <template slot-scope="scope">            
          <router-link :to="{name:'detail',query: {lid:scope.row.lid}}">{{scope.row.name}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        v-if="type === 'favour'"
        prop="authors"
        label="歌手"
        :formatter="nameFormatter"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        v-else
        prop="creator"
        label="创建者"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <div slot-scope="scope" class="hide">
          <el-button
            icon="el-icon-caret-right" 
            circle
            title="播放"
            @click="handlePlay(scope.$index, scope.row)"></el-button>
          <el-button
            v-if="type === 'favour'"
            icon="el-icon-plus" 
            circle
            title="添加到歌单"
            @click="handle(scope.$index, scope.row)"></el-button>
          <el-button
            v-if="type === 'favour'"
            icon="el-icon-download" 
            circle
            title="下载"
            @click="handleDownload(scope.$index, scope.row)"></el-button>
          <el-button
            icon="el-icon-share" 
            circle
            title="分享"
            @click="handleShare(scope.$index, scope.row)"></el-button>
          <el-button
            icon="el-icon-delete" 
            circle
            :title="type === 'upload' || type === 'created' ?'删除':'取消收藏'"
            @click="handleCancel(scope.$index, scope.row)"></el-button>
        </div>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-size="10"
      :pager-count="5"
      layout="prev, pager, next"
      :total="total"
      :hide-on-single-page="true"
      @current-change="pageTurn">
    </el-pagination>
  </div>
</template>

<script>
import {getUserUploadedSongs ,getUserFavouriteSongs, getUserFavouritePlaylists,getUserCreatedPlaylist} from '@/api/user.js';
import {cancelFavSong,cancelFavPlaylist,deleteOwnSong,deleteOwnPlaylist} from '@/api/favour.js';
export default {
  name: 'SelectedTable',
  data(){
    return{
      multipleSelection: [],
      list:[],
      total:null,
      previous:null,
      next:null,
      page:1
    }
  },
  props:['isSelection','type'],
  created(){
    let fn = this.judgeFn();
    this.getInfo(fn,1);
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 判断使用的获取信息函数
    judgeFn(){
      if(this.type === 'favour'){
        return getUserFavouriteSongs;
      } else if (this.type === 'upload') {
        return getUserUploadedSongs;
      } else if (this.type === 'playlist') {
        return getUserFavouritePlaylists;
      } else if(this.type === 'created') {
        return getUserCreatedPlaylist;
      }
    },
    // 统一查询信息逻辑
    getInfo(fn,page){
      fn(page).then(res=>{
        this.list = res.results;
        this.total = res.count;
        this.previous = res.previous;
        this.next = res.next;
        this.page = res.page
      })
    },
    // 将数据中的名字数组格式化成字符串
    nameFormatter(row, column) {
      let arr = [];
      row.authors.forEach(item => {
        arr.push(item.name)
      });
      return arr.join(' / ');
    },
    // 生成歌单序号
    indexMethod(index) {
      return (this.page-1)*10+index + 1;
    },
    // 翻页
    pageTurn(page){
      let fn = this.judgeFn();
      this.getInfo(fn,page);
    },
    // 显示按钮组
    showBtnGroup(row, column, cell, event){
      cell.parentNode.lastChild.children[0].children[0].classList.remove('hide');
    },
    // 隐藏按钮组
    hideBtnGroup(row, column, cell, event){
      cell.parentNode.lastChild.children[0].children[0].classList.add('hide');
    },
    // 处理播放事件
    handlePlay(index,row){
      this.playSong(row.sid);
    },
    // 处理下载事件
    handleDownload(index,row){
      let url = row.file;
      let filename = row.name;

      // 将lob对象转换为域名结合式的url
      let blob = new Blob([url], {
        type:"audio/mpeg"
      });
      let blobUrl = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      document.body.appendChild(link);
      link.style.display = 'none';
      link.href = blobUrl;
      // 设置a标签的下载属性，设置文件名及格式，后缀名最好让后端在数据格式中返回
      link.download = filename;
      // 自触发click事件
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    },
    // 处理分享事件
    handleShare(index,row){
      let sid = row.sid;
      let host = window.location.host;
      let url = `${host}/player?sid=${sid}`;

      this.$confirm(url, '歌曲播放链接', {
        confirmButtonText: '复制分享',
        cancelButtonText: '算了吧',
      }).then(() => {
        let copyContent = document.querySelector('.el-message-box__message').innerText;
        let oInput = document.createElement('input');
        oInput.value = copyContent;
        document.body.appendChild(oInput);
        oInput.select();// 选择对象
        document.execCommand("Copy");// 执行浏览器复制命令
        oInput.style.display='none';

        this.$message({
          type: 'success',
          message: '已复制至剪贴板，快去分享给小伙伴吧!'
        });
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消分享'
          });          
      });
    },
    // 处理取消收藏事件
    handleCancel(index,row){
      if(this.type === 'playlist'){
        this.cancel(cancelFavPlaylist,row.fid);
      } else if(this.type === 'favour'){
        this.cancel(cancelFavSong,row.fid);
      } else if(this.type === 'upload'){
        this.delete(deleteOwnSong,row.sid);
      } else if (this.type ==="created") {
        this.delete(deleteOwnPlaylist,row.lid);
      }
    },
    // 取消事件
    cancel(fn,fid) {
      let message = this.type === 'upload'?'删除成功':'取消成功';
      fn(fid).then(()=>{
        this.$message({
          message,
          type: 'success'
        })
        this.getInfo(fn,1);
        window.location.reload();
      })
    },
    // 删除事件
    delete(fn,id){
      this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancel(fn,id);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 播放歌曲
    playSong(sid){
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
    // 播放全部
    playAll(){
      // 准备歌单
      let newList = [];
      this.list.forEach((item)=>{
        newList.push(item.sid);
      })

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
    }
  },
  watch: {
    isSelection(newVal,oldVal){
      if(newVal) {
        this.$refs.multipleTable.toggleAllSelection();
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }
  }
}

</script>
<style scoped lang='less'>
  .wrapper{
    .el-table{
      margin: 20px 0;
      .hide{
        display:none;
      }
    }
    .el-pagination{
      margin: 10px auto;
      text-align: center;
    }
  }
  
</style>