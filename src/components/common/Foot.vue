<template>
  <footer>
    Copyright © 2019 DGUT Group Ten. All Rights Reserved.
  </footer>
</template>

<script>
export default {
  name: 'Foot'
}

</script>
<style scoped lang='less'>
@import '../../styles/common.less';
  footer{
    height: 60px;
    width: 100%;
    background: @footer-bg-color;
    color: @footer-text-color;
    font-size: @fs-s;
    text-align: center;
    line-height: 60px;
    vertical-align: middle;
  }
</style>