<template>
  <div class="search">
    <header class="banner">
       <el-input
        class="input"
        placeholder="搜索音乐、歌单、用户"
        prefix-icon="el-icon-search"
        v-model="searchText">
      </el-input>
    </header>
    <main>
      <nav>
        <span>单曲</span>
        <span>歌单</span>
        <span>用户</span>
      </nav>
    </main>
  </div>
</template>

<script>
export default {
  name:'Search',
  data(){
    return {
      searchText:null
    }
  },
  computed: {
    text(){
      return this.$route.query.searchText;
    }
  },
  watch: {
    text(newValue){
      this.searchText = newValue;
    }
  }
}

</script>
<style scoped lang='less'>
  .search{
    margin-top: -2px;
    .banner{
      height:247px;
      text-align: center;
      background-image: url(https://s2.ax1x.com/2019/12/10/QDhCyn.jpg);
      background-position: 0 70%;
      background-size: cover;
      .input{
        margin-top: 80px;
        margin-left: 50%;
        transform: translate(-50%,0);
        width: 50%;
      }
    }
    main{
      nav {
        padding: 10px;
        span{
          margin-right: 30px;
        }
      }
    }
  }
</style>