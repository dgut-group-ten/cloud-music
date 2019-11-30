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
      <el-carousel type="card" height="300px" :autoplay="false" trigger="click" 
        ref="carousel" @click.native="_toDetailPage"> 
        <el-carousel-item v-for="(item, index) in playlist" :key="index">
          <img class="gallery-main__img" src="https://s2.ax1x.com/2019/11/13/MGTB4J.md.jpg">
          <div class="gallery-main__text">{{ item.name }}</div>
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
    },
    _toDetailPage(e) {
      // 点击到mask上不进行跳转
      if (e.target._prevClass !== 'gallery-main__img') {
        return;
      }
      let lid = this.playlist[this.$refs.carousel.activeIndex].lid;
      this.$router.push({name:'detail', query: {lid}});
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
    font-size: @fs-xxxl;
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
    .gallery-main__img{
      width:100%;
      height:100%;
      background-size: 725px 725px;
      &:hover{
        transform: scale(1.1) translateZ(0);
        transition: transform .75s;
      }
    }
    .gallery-main__text{
      position: absolute;
      top:85%;
      color:@text-color;
      padding: 10px 0 5% 10px;
      width: 100%;
      font-size: @fs-xxl;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background: rgba(255,255,255,.3);
    }
  }
}
</style>
