<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in path.slice(0,len-1)" :key="index" :to="{ path: item }">{{nameMapping(item)}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{nameMapping(path[len-1])}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  created() {
    // 获取路由
    let hash = window.location.hash;
    let arr = hash.slice(1,hash.indexOf('?')).split('/');
    let res = [];
    let tmp = '';
    
    // 逐级组装
    for(let i =1;i < arr.length;i++){
      tmp+='/'+arr[i]
      res.push(tmp);
    }
    this.path = res;
    this.len = res.length;
  },
  data() {
    return {
      path:[],
      len:null
    }
  },
  methods:{
    /**
     * @description: 根据路径返回其对应的页面名称
     * @param {path:路径} 
     * @return: 页面名称
     */
    nameMapping(path){
      switch(path) {
        case '/home':
          return '首页';
        case '/home/detail':
          return '歌单详情';
      }
    }
  }
}

</script>
<style scoped lang='less'>
  .el-breadcrumb{
    padding-top: 20px;
  }
</style>