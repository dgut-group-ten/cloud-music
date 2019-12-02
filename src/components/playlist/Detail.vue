<template>
  <div class="main" v-if="playlist">
    <!-- 面包屑 -->
    <Breadcrumb></Breadcrumb>
    <!-- 歌单基本信息 -->
    <div class="data">
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
        <!-- 按钮组 -->
        <el-row>
          <el-button type="primary" icon="el-icon-video-play"
            >播放全部</el-button
          >
          <el-button icon="el-icon-star-off">收藏</el-button>
          <el-button icon="el-icon-chat-dot-square">评论 (99)</el-button>
          <el-button icon="el-icon-more-outline">更多</el-button>
        </el-row>
      </div>
    </div>
    <!-- 歌单详细 -->
    <el-row class="detail" :gutter="40">
      <!-- 歌曲列表 -->
      <el-col :span="15">
        <el-table :data="curList" style="width: 100%" stripe>
          <el-table-column type="index" :index="indexMethod" width="80"></el-table-column>
          <el-table-column prop="name" label="歌曲" width="300"></el-table-column>
          <el-table-column prop="authors[0].name" label="歌手"></el-table-column>
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
    <comment></comment>
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
    indexMethod(index) {
      return (this.curPage-1)*10+index + 1;
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
  padding: 0 7.5%;
  background: @content-bg-color;
  .data {
    padding-top: 20px;
    padding-bottom: 10px;
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
        margin-bottom: 8px;
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
    margin-top: 20px;
    .detail-pagination{
      margin-top: 10px;
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
}
</style>
