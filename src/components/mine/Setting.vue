<template>
  <div>
    <el-tabs tab-position="left" style="height: 400px;">
      <el-tab-pane label="修改密码">
        <Form :type="'password'"></Form>
      </el-tab-pane>
      <el-tab-pane label="更换认证邮箱">
        <Form :type="'mail'"></Form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Form from '@/components/mine/Form.vue';
export default {
  name: 'Setting',
  components:{
    Form,
  }
}

</script>
<style scoped lang='less'>
</style>