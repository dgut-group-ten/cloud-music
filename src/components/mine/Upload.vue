<template>
  <div class="wrapper">
    <!-- 按钮组 -->
    <div class="btn-group">
      <el-button type="primary" icon="el-icon-video-play">播放</el-button>
      <el-button icon="el-icon-circle-plus-outline">添加到</el-button>
      <el-button icon="el-icon-download">下载</el-button>
      <el-button icon="el-icon-document-copy">批量操作</el-button>
    </div>
    <SelectedTable></SelectedTable>
  </div>
</template>

<script>
import SelectedTable from '@/components/mine/SelectedTable.vue';
export default {
  name: 'Upload',
  data(){
    return{
      activeName:'first'
    }
  },
  components:{
    SelectedTable
  }
}

</script>
<style scoped lang='less'>
  .wrapper{

  }
</style>