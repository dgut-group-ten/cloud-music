<template>
  <div id="app">
    <router-view/>
    <!-- 回到顶部 -->
    <el-button icon="el-icon-arrow-up" circle class="back-to-top" 
    @click="scrollToTop" v-show="isScrollTop"></el-button>
  </div>
</template>

<style lang="less">
@import './styles/reset.css';
@import './theme/index.css';
@import './styles/icon-front.css';
* {
  margin: 0;
  padding: 0;
}
.back-to-top{
  position: fixed;
  bottom: 50px;
  right: 30px;
  z-index: 999;
}
</style>
<script>
export default {
  created() {
    //在页面加载时读取localStorage里的状态信息
    // TODO:发送请求验证Token是否过期
    localStorage.getItem('state') &&
      this.$store.replaceState(JSON.parse(localStorage.getItem('state')))

    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('state', JSON.stringify(this.$store.state))
    })
  },
  mounted(){
    // 监听滚动事件
    window.addEventListener('scroll', () => {
      this.scrollTop = document.documentElement.scrollTop ||document.body.scrollTop; 

      // 控制滚动按钮的隐藏或显示
      if (this.scrollTop > 150) {
        this.isScrollTop = true;
      } else {
        this.isScrollTop = false;
      }
    }, true);
  },
  data() {
    return {
      isScrollTop: false
    }
  },
  methods: {
    // 滚动回到顶部
    scrollToTop() {
      let that = this;

      // 返回顶部动画特效
      setTimeout(function animation() {
        if (that.scrollTop > 0) {
          setTimeout(() => {

            // 步进速度
            const speed = 8;
            that.scrollTop -= speed;

            // 返回顶部
            if(document.documentElement.scrollTop > 0) {
              document.documentElement.scrollTop = that.scrollTop - speed;
            }  else if (document.body.scrollTop > 0) {
              document.body.scrollTop = that.scrollTop - speed;
            }
            animation();
          }, 1);
        }
      }, 1);
    }
  }
}
</script>
