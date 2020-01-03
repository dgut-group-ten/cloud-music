<template>
  <div class="wrapper">
    <div class="container">
      <h2>私人音乐空间，听我想听的歌</h2>
      <p>您还未登录，请先登录再进入音乐空间</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Prompt'
}

</script>
<style scoped lang='less'>
  .wrapper{
    height: 800px;
    width: 100%;
    background: url(https://y.gtimg.cn/mediastyle/yqq/img/bg_profile_unlogin.jpg?max_age=2592000&v=13351eccb28020677a18a0f57349e5e6) 50% no-repeat;
    background-size: cover;
    overflow: hidden;
    .container{
      position: relative;
      top: 40%;
      left:50%;
      transform: translate(-50%,-50%);
      text-align: center;
      color: #fff;
      h2{
        font-size: 60px;
      }
      p{
        margin-top: 35px;
      }
    }
  }
</style>