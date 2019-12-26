<template>
  <div class="wrapper">
    <div class="container">
      <header>{{text}}</header>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reset',
  data(){
    return {
      text:'输入帐号'
    }
  }
}

</script>
<style scoped lang='less'>
@import '../../styles/common.less';
  .wrapper{
    width: 100%;
    min-height: 650px;
    background: #f4f4f4;
    .container{
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      width:80%;
      background:#fff;
      header{
        font-size: @fs-xxxl;
        font-weight: @fw-l;
        text-align: center;
        margin: 30px 0;
        border-bottom: 1px solid #fdfdfd;
      }
    }
  }
</style>