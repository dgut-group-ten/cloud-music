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
          <el-button icon="el-icon-chat-dot-square" @click="goToComment">评论 ({{commentNum}})</el-button>
          <el-button icon="el-icon-more-outline">更多</el-button>
        </el-row>
      </div>
    </div>
    <!-- 歌单详细 -->
    <el-row class="detail" :gutter="40">
      <!-- 歌曲列表 -->
      <el-col :span="18">
        <Table :curList='curList' :playlist="playlist" :total="total"></Table>
      </el-col>
      <!-- 歌单简介 -->
      <el-col :span="6" class="desc">
        <h3 class="desc-title">简介</h3>
        <div class="desc-cont">
          {{playlist.description}}
        </div>
      </el-col>
    </el-row>
    <!-- 评论 -->
    <comment id="comment" class="comment" :rid="playlist.lid"></comment>
  </div>
</template>

<script>
import { getPlaylistDetailByLid } from '@/api/playlist.js';
import { getComments } from '@/api/comment.js';
import Comment from '@/components/common/Comment.vue';
import Breadcrumb from '@/components/common/Breadcrumb.vue';
import Table from '@/components/common/Table.vue';

export default {
  name: 'Detail',
  data() {
    return {
      playlist: null,
      total:null,
      curPage: 1,
      curList:null,
      commentNum:null
    }
  },
  created() {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
    });
    setTimeout(() => {
      loading.close();
    }, 400);

    let lid = this.$route.query.lid
    getPlaylistDetailByLid(lid).then(res => {
      console.log('歌单信息',res);
      this.playlist = res
      this.total = res.tracks.length;
      this.curList = this.playlist.tracks.slice((this.curPage-1)*10,this.curPage*10);

      getComments(res.lid,1,5).then((res)=>{
        this.commentNum = res.data.totalElements;
      })
    })
  },
  components:{
    Comment,
    Breadcrumb,
    Table,
  },
  methods:{
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
      
    },
    // 跳转到评论部分
    goToComment(){
      let el = document.querySelector('#comment');
      document.documentElement.scrollTop = el.offsetTop;
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
    width: 92.5%;
    padding-left:7.5%;
    margin-top: 20px;
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
