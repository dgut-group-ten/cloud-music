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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="单曲" name="first">
          <Tab :label="'单曲'" :text="text"></Tab>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="second">
          <Tab :label="'歌单'" :text="text"></Tab>
        </el-tab-pane>
        <el-tab-pane label="用户" name="third">
          <Tab :label="'用户'" :text="text"></Tab>
        </el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>

<script>
import Tab from '@/components/search/Tab.vue';
export default {
  name:'Search',
  data(){
    return {
      searchText:null,
      activeName: 'first'
    }
  },
  components:{
    Tab
  },
  computed: {
    text(){
      return this.$route.query.searchText;
    }
  },
  watch: {
    text(newValue){
      window.location.reload();
      this.searchText = newValue;
    }
  },
  methods: {
    handleClick(){
      
    }
  }
}

</script>
<style scoped lang='less'>
@import '../../styles/common.less';
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
      padding: 10px;
      width: 80%;
      margin: 0 auto;
    }
  }
</style>