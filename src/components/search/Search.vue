<template>
  <div class="search">
    <header class="banner">
       <el-input
        class="input"
        placeholder="搜索音乐、歌单、用户"
        @keyup.enter.native="search"
        v-model="searchText">
        <i slot="suffix" class="el-icon-search" @click="search"></i>
      </el-input>
    </header>
    <main>
      <el-tabs v-model="activeName">
        <el-tab-pane label="单曲" name="first">
          <Tab :label="'单曲'" :text="text"></Tab>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="second">
          <Tab :label="'歌单'" :text="text"></Tab>
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
    search() {
      let searchText = this.searchText;
      if (searchText == null) { return;}
      this.searchText = null;
      this.$router.push({name:'search',query: {searchText}});
    }
  }
}

</script>
<style scoped lang='less'>
@import '../../styles/common.less';
  .search{
    min-height: 500px;
    margin-top: -2px;
    .banner{
      height:247px;
      text-align: center;
      background-image: url(https://y.gtimg.cn/mediastyle/yqq/img/bg_search.jpg);
      background-position: 0 70%;
      background-size: cover;
      .input{
        margin-top: 80px;
        margin-left: 50%;
        transform: translate(-50%,0);
        width: 50%;
        .el-icon-search{
          padding-top: 13px;
          padding-right: 3px;
        }
      }
    }
    main{
      min-height: 380px;
      padding: 10px;
      width: 80%;
      margin: 0 auto;
    }
  }
</style>