<template>
  <div>
    <gallery :info="config.playlistRecommended"></gallery>
    <gallery :info="config.playlistRecommended"></gallery>
  </div>
</template>

<script>
import Gallery from '@/components/playlist/Gallery.vue';
import config from '@/config/gallery.js';

export default {
  name: 'Main',
  data() {
    return {
      config
    }
  },
  components: {
    Gallery
  }
}

</script>
<style scoped lang='less'>
</style>