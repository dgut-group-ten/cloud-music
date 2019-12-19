<template>
  <div class="wrapper">
    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲" name="first">
        <!-- 按钮组 -->
        <div class="btn-group">
          <el-button type="primary" icon="el-icon-video-play">播放</el-button>
          <el-button icon="el-icon-circle-plus-outline">添加到</el-button>
          <el-button icon="el-icon-download">下载</el-button>
          <el-button icon="el-icon-document-copy">批量操作</el-button>
        </div>
        <SelectedTable></SelectedTable>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="second">歌单</el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
import SelectedTable from '@/components/mine/SelectedTable.vue';
export default {
  name: 'Favour',
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