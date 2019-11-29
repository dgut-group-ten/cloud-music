<template>
  <div class="gallery-wrapper">
    <header class="gallery-header">{{ info.name }}</header>
    <ul class="gallery-nav">
      <li
        class="gallery-nav__item"
        v-for="(tag, index) of info.tags"
        :key="index"
        :style="{ color: curIndex === index ? '#c40b0b' : '' }"
        @click="clickHandle(index)"
      >
        {{ tag }}
      </li>
    </ul>
    <section class="gallery-main">
      <el-carousel type="card" height="300px" :autoplay="false" trigger="click">
        <el-carousel-item v-for="(item, index) in playlist" :key="index">
          <span class="gallery-main__text">{{ item.name }}</span>
        </el-carousel-item>
      </el-carousel>
    </section>
  </div>
</template>

<script>
import { getPlaylistByTagName } from '@/api/playlist.js';
export default {
  name: 'Gallery',
  props: ['info'],
  data() {
    return {
      curIndex: 0,
      playlist:[],
    }
  },
  created() {
    this._getPlaylist();
  },
  watch:{
    curIndex () {
      this._getPlaylist();
    }
  },
  methods: {
    clickHandle(newIndex) {
      this.curIndex = newIndex
    },
    _getPlaylist(){
      let tagName = this.info.tags[this.curIndex];
      getPlaylistByTagName(tagName)
      .then(res => {
        this.playlist = res.results;
      });
    }
  }
}
</script>
<style scoped lang="less">
@import '../../styles/common.less';

.gallery-wrapper {
  height: 532px;
  width: 100%;
  background: linear-gradient(to bottom, #f3f3f3, #fafafa);
  .gallery-header {
    width: 80%;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 30px;
    text-align: center;
    font-size: @fs-xxl;
    font-weight: @fw;
    letter-spacing: 8px;
  }
  .gallery-nav {
    width: 80%;
    height: 60px;
    margin: 0 auto;
    text-align: center;
    .gallery-nav__item {
      display: inline-block;
      margin-right: 25px;
      &:hover {
        color: @color-active;
        cursor: pointer;
      }
    }
  }
  .gallery-main {
    .gallery-main__text{
      position: absolute;
      top:90%;
      color:@text-color;
      margin-left: 10px;
      width: 400px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
}
</style>
