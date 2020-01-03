<template>
  <div class="wrapper">
    <!-- 按钮组 -->
    <!-- <div class="btn-group">
      <el-button type="primary" icon="el-icon-video-play">播放</el-button>
      <el-button icon="el-icon-circle-plus-outline">添加到</el-button>
      <el-button icon="el-icon-download">下载</el-button>
      <el-button icon="el-icon-delete">删除</el-button>
      <el-button icon="el-icon-document-copy">批量操作</el-button>
    </div> -->
    <SelectedTable :type="'upload'"></SelectedTable>
  </div>
</template>

<script>
import SelectedTable from '@/components/mine/SelectedTable.vue';
export default {
  name: 'Upload',
  components:{
    SelectedTable
  }
}

</script>
<style scoped lang='less'>
  .wrapper{
    min-height: 400px;
  }
</style>