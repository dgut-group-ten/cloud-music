<template>
  <div class="main" v-if="playlist">
    <!-- 歌单基本信息 -->
    <div class="data">
      <!-- 面包屑 -->
      <Breadcrumb></Breadcrumb>
      <!-- 歌单封面 -->
      <div class="data-cover">
        <img
          :src="playlist.cimg"
          class="data-photo"
        />
      </div>
      <div class="data-cont">
        <!-- 歌单名称 -->
        <div class="data-name">
          {{ playlist.name }}
        </div>
        <!-- 歌单作者 -->
        <div class="data-singer">
          <i class="el-icon-user"></i>
          {{ playlist.creator }}
        </div>
        <!-- 歌单标签 -->
        <div>
          <span>标签：</span>
          <ul
            v-for="(item, index) in playlist.tags"
            :key="index"
            class="data-tags"
          >
            <li class="data-tag">{{ item }}</li>
          </ul>
        </div>
        <div>
          播放量：{{playlist.click}}
        </div>
        <!-- 按钮组 -->
        <el-row>
          <el-button type="primary" icon="el-icon-video-play" @click="playAll">播放全部</el-button>
          <el-button icon="el-icon-star-off">收藏</el-button>
          <el-button icon="el-icon-chat-dot-square">评论 (99)</el-button>
          <el-button icon="el-icon-more-outline">更多</el-button>
        </el-row>
      </div>
    </div>
    <!-- 歌单详细 -->
    <el-row class="detail" :gutter="40">
      <!-- 歌曲列表 -->
      <el-col :span="18">
        <el-table :data="curList" stripe
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
      </el-col>
      <!-- 歌单简介 -->
      <el-col :span="5" class="desc">
        <h3 class="desc-title">简介</h3>
        <div class="desc-cont">
          {{playlist.description}}
        </div>
      </el-col>
    </el-row>
    <!-- 评论 -->
    <comment class="comment"></comment>
  </div>
</template>

<script>
import { getPlaylistDetailByLid } from '@/api/playlist.js';
import Comment from '@/components/common/Comment.vue';
import Breadcrumb from '@/components/common/Breadcrumb.vue';

export default {
  name: 'Detail',
  data() {
    return {
      playlist: null,
      total:null,
      curPage: 1,
      curList:null
    }
  },
  created() {
    let lid = this.$route.query.lid
    getPlaylistDetailByLid(lid).then(res => {
      console.log('歌单信息',res);
      this.playlist = res
      this.total = res.tracks.length;
      this.curList = this.playlist.tracks.slice((this.curPage-1)*10,this.curPage*10);
    })
  },
  components:{
    Comment,
    Breadcrumb,
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
      let sid = this.playlist.tracks[index-1].sid;

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
    playAll() {
      // 准备歌单
      let newList = [];
      this.playlist.tracks.forEach((item)=>{
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
    curPage(newValue, oldValue){
      this.curList = this.playlist.tracks.slice((newValue-1)*10,newValue*10);
    }
  },
}
</script>
<style scoped lang="less">
@import '../../styles/common.less';

.main {
  width: 100%;
  padding-bottom: 100px;
  .data {
    padding: 0 7.5%;
    padding-bottom: 10px;
    background: @content-bg-color;
    .data-cover {
      float: left;
      .data-photo {
        width: 250px;
        height: 250px;
        object-fit: cover;
      }
    }
    .data-cont {
      margin-top: 30px;
      margin-left: 280px;
      & > div {
        margin-bottom: 12px;
        font-size: @fs;
      }
      & > div:nth-child(2) {
        margin-top: 18px;
      }
      & > div:nth-last-child(2) {
        margin-bottom: 50px;
      }
      .data-name {
        font-size: @fs-xxxl;
      }
      .data-tags {
        display: inline;
        .data-tag {
          display: inline-block;
          width: 50px;
        }
      }
    }
    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
  .detail{
    padding: 0 7.5%;
    margin-top: 20px;
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
    .desc-title{
      font-weight: @fw-l;
    }
    .desc-cont{
      margin-top: 10px;
      font-size: @fs-s;
      line-height: 1.7;
    }
  }
  .comment{
    padding: 0 7.5%;
  }
}
</style>
