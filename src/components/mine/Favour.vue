<template>
  <div class="wrapper">
    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲" name="first">
        <!-- 按钮组 -->
        <div class="btn-group">
          <el-button type="primary" icon="el-icon-video-play" @click="playAll">播放全部</el-button>
          <el-button icon="el-icon-circle-plus-outline">添加到</el-button>
          <el-button icon="el-icon-download">下载</el-button>
          <el-button icon="el-icon-document-copy" @click="batchProcessing($event)">批量操作</el-button>
        </div>
        <SelectedTable 
        :isSelection="isSelection" 
        :type="'favour'" 
        ref="child"></SelectedTable>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="second">
        <SelectedTable 
        :isSelection="isSelection" 
        :type="'playlist'"></SelectedTable>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
import SelectedTable from '@/components/mine/SelectedTable.vue';
export default {
  name: 'Favour',
  data(){
    return{
      activeName:'first',
      isSelection: false
    }
  },
  components:{
    SelectedTable
  },
  methods: {
    // 批量处理
    batchProcessing(e){
      if(this.isSelection){
        e.currentTarget.lastChild.innerHTML = '批量操作';
      } else {
        e.currentTarget.lastChild.innerHTML = '取消批量操作';
      }
      this.isSelection = !this.isSelection;
    },
    // 播放全部
    playAll(){
      this.$refs.child.playAll();
    }
  }
}

</script>
<style scoped lang='less'>
</style>