<template>
  <div class="wrapper">
    <!-- 按钮组 -->
    <div class="btn-group">
      <el-button icon="el-icon-plus" @click="centerDialogVisible = true">新建歌单</el-button>
    </div>
    <SelectedTable :type="'created'"></SelectedTable>
    <el-dialog
      title="创建新歌单"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <!-- 表单 -->
      <el-form :model="form" :rules="rules" ref="form" label-width="70px">
        <el-form-item label="歌单名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(tag, index) in form.tags"
          :label="'标签' + (index+1)"
          :key="tag.key"
          :prop="'tags.' + index + '.value'"
        >
          <el-input v-model="tag.value"></el-input>
          <el-button @click.prevent="removeTag(tag)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click.prevent="addTag">添加新标签</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SelectedTable from '@/components/mine/SelectedTable.vue';
import {createPlaylist} from '@/api/playlist.js';
export default {
  name: 'Created',
  data() {
    return {
      centerDialogVisible: false,
      form: {
          name: '',
          desc:'',
          cimg:'',
          tags: [{
            value: ''
          }],
        },
        rules: {
          name: [
            { required: true, message: '歌单名不能为空', trigger: 'blur' },
          ],
          desc:[
            { required: true, message: '简介不能为空', trigger: 'blur' },
          ]
        }
    };
  },
  components:{
    SelectedTable
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let tags = [];
          this.form.tags.forEach((item)=>{
            tags.push(item.value);
          })
          tags = tags.join(' ');
          createPlaylist(tags,this.form.name,this.form.desc)
          .then(()=>{
            this.centerDialogVisible = false;
            this.$message({
              message: '创建成功',
              type:'success'
            })
            window.location.reload();
          })
          .catch((err)=>{
            console.log(err.response)
          })
        } else {
          console.log('请填写完整相关信息!!');
          return false;
        }
      });
    },
    removeTag(item) {
      let index = this.form.tags.indexOf(item)
      if (index !== -1) {
        this.form.tags.splice(index, 1)
      }
    },
    addTag() {
      this.form.tags.push({
        value: '',
        key: Date.now()
      });
    }
  }
}
</script>
<style scoped lang='less'>
.wrapper{
  min-height: 400px;
}
</style>