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
          <input type="radio" id="first" value="first" v-model="option">
          <label for="first">我喜欢</label>
          <input type="radio" id="second" value="second" v-model="option">
          <label for="second">我创建的歌单</label>
          <input type="radio" id="third" value="third" v-model="option">
          <label for="third">我上传的歌曲</label>
        </nav>
      </div>
    </header>
    <main>
      kk
    </main>
  </div>
</template>

<script>
import {getUserInfo} from '@/api/user.js';
export default {
  name: 'Mine',
  data(){
    return {
      info:null,
      option:'first'
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
          position: absolute;
          left:10%;
          top:405px;
          input{
            display: none;
          }
          label{
            font-size: @fs;
            font-weight: 300;
            margin-right: 40px;
            cursor: pointer;
          }
          input[type="radio"]:checked + label{
            color: @color-active;
          }
        }
      }
    }
    main{
      width: 90%;
      padding: 20px 10%;
    }
  }
</style>