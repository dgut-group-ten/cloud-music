<template>
  <div class="wrapper">
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        :index="indexMethod"
        width="50">
      </el-table-column>
      <el-table-column label="封面" min-width="30" >
        <!-- 图片的显示 -->
        <template slot-scope="scope">            
          <img :src="scope.row.cimg" min-width="70" height="70" />
        </template>         
      </el-table-column>
      <el-table-column
        prop="name"
        label="歌曲"
        width="320">
      </el-table-column>
      <el-table-column
        prop="authors"
        label="歌手"
        :formatter="nameFormatter"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-caret-right" 
            circle
            title="播放"
            @click="handle(scope.$index, scope.row)"></el-button>
          <el-button
            icon="el-icon-plus" 
            circle
            title="添加到歌单"
            @click="handle(scope.$index, scope.row)"></el-button>
          <el-button
            icon="el-icon-download" 
            circle
            title="下载"
            @click="handle(scope.$index, scope.row)"></el-button>
          <el-button
            icon="el-icon-s-promotion" 
            circle
            title="分享"
            @click="handle(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-size="10"
      :pager-count="5"
      layout="prev, pager, next"
      :total="total"
      :hide-on-single-page="true"
      @current-change="pageTurn">
    </el-pagination>
  </div>
</template>

<script>
import {getUserSongs} from '@/api/user.js'
export default {
  name: 'SelectedTable',
  data(){
    return{
      list:[],
      total:null,
      previous:null,
      next:null,
      curPage:1
    }
  },
  created(){
    getUserSongs(1).then(res=>{
      this.list = res.results;
      this.total = res.count;
      this.previous = res.previous;
      this.next = res.next;
      this.page = res.page
    })
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 将数据中的名字数组格式化成字符串
    nameFormatter(row, column) {
      let arr = [];
      row.authors.forEach(item => {
        arr.push(item.name)
      });
      return arr.join(' / ');
    },
    // 生成歌单序号
    indexMethod(index) {
      return (this.curPage-1)*10+index + 1;
    },
    // 翻页
    pageTurn(page){
      getUserSongs(page).then(res=>{
        this.list = res.results;
        this.total = res.count;
        this.previous = res.previous;
        this.next = res.next;
        this.page = res.page
      })
    }
  }
}

</script>
<style scoped lang='less'>
  .wrapper{
    .el-table{
      margin: 20px 0;
    }
    .el-pagination{
      margin: 10px auto;
      text-align: center;
    }
  }
  
</style>