<template>
  <div class="wrapper" v-if="info">
    <header>
      <div class="info">
        <!-- 头像 -->
        <div class="avatar">
          <img class="avatar_img" :src="info.headIcon" alt="">
        </div>
        <!-- 名称 -->
        <h2 class="name">{{info.name}}</h2>
        <!-- 收藏信息 -->
        <div class="collect-info">
          <div class="info-box">
            <span class="num">582</span>
            <span class="title">歌曲数</span>
          </div>
          <div class="info-box">
            <span class="num">15</span>
            <span class="title">歌单数</span>
          </div>
        </div>
        <!-- 导航栏 -->
        <nav>
          <ul>
            <li>我喜欢</li>
            <li>我创建的歌单</li>
            <li>我上传的歌曲</li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
import {getUserInfo} from '@/api/user.js';
export default {
  name: 'Mine',
  data(){
    return {
      info:null
    }
  },
  created(){
    let info = JSON.parse(localStorage.getItem('state')).userInfo;
    getUserInfo(info.name).then( res => {
      this.info = res.data;
    })
  }
}

</script>
<style scoped lang='less'>
@import '../../styles/common.less';
  .wrapper{
    header{
      height:380px;
      background: url(https://y.gtimg.cn/mediastyle/yqq/img/bg_profile.jpg?max_age=2592000&v=a81e58d2beb14c0122de6513faaead8d) 50% no-repeat;
      background-size: cover;
      text-align: center;
      color: #fff;
      .info{
        padding-top: 65px;
        .avatar{
          width: 102px;
          height: 102px;
          margin: 0 auto;
          .avatar_img{
            width: 100%;
            height: 100%;
            border: 4px solid #fff;
            border-radius: 99px;
            background: #fff;
          }
        }
        .name{
          margin-top: 20px;
          font-size: 30px;
          font-weight: 400;
        }
        .collect-info{
          margin-top: 30px;
          display:flex;
          flex-direction: row;
          justify-content: center;
          & > div:nth-child(1){
            border-right: 1px solid #fff;
            padding-right: 25px;
          }
          & > div:nth-child(2){
            padding-left: 25px;
          }
          .info-box{
            display: flex;
            flex-direction: column;
            font-weight: 300;
            .num{
              font-size: 22px;
              &:hover{
                color:@color-active;
              }
            }
            .title{
              margin-top: 10px;
              font-size: 14px;
            }
          }
        }
        nav{
          ul li{
            display: inline-block;
            margin-right: 15px;
          }
        }
      }
    }
  }
</style>