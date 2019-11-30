<template>
  <div class="main" v-if="playlist">
    <!-- 歌单基本信息 -->
    <div class="data">
      <!-- 歌单封面 -->
      <div class="data-cover">
        <img
          src="https://qpic.y.qq.com/music_cover/Uj77DagTFgiccudSicYvppRmLiaOePF980QibHby0Gha0EaKVdzx69qZCg/300?n=1"
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
    <div class="detail">
      <div class="song-list">
        <el-table :data="playlist.tracks" style="width: 60%" stripe>
          <el-table-column type="index" :index="indexMethod" width="80">
          </el-table-column>
          <el-table-column prop="name" label="歌曲" width="220">
          </el-table-column>
          <el-table-column prop="authors[0].name" label="歌手"> </el-table-column>
        </el-table>
      </div>
      <div class="desc"></div>
    </div>
  </div>
</template>

<script>
import { getPlaylistDetailByLid } from '@/api/playlist.js'

export default {
  name: 'Detail',
  data() {
    return {
      playlist: null
    }
  },
  created() {
    let lid = this.$route.query.lid
    getPlaylistDetailByLid(lid).then(res => {
      this.playlist = res
    })
  },
  methods:{
    indexMethod(index) {
      return index + 1;
    }
  }
}
</script>
<style scoped lang="less">
@import '../../styles/common.less';

.main {
  width: 100%;
  padding: 0 7.5%;
  background: @content-bg-color;
  .data {
    padding-top: 40px;
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
}
</style>
