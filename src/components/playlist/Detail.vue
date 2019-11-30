<template>
  <div>
    <div v-if="playlist">
      <ul v-for="(item, index) in playlist.tracks" :key="index">
        <li>{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getPlaylistDetailByLid } from '@/api/playlist.js';

export default {
  name: 'Detail',
  data() {
    return {
      playlist:null
    }
  },
  created() {
    let lid = this.$route.query.lid;
    getPlaylistDetailByLid(lid).then(res => {
      this.playlist = res;
    })
  }
}

</script>
<style scoped lang='less'>
</style>
