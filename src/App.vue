<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import './styles/reset.css';
* {
  margin: 0;
  padding: 0;
}
</style>
<script>
export default {
  created (){
     //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("state") && this.$store.replaceState(JSON.parse(localStorage.getItem("state")));
    
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
      localStorage.setItem("state",JSON.stringify(this.$store.state))
    })
  }
}
</script>
