<template>
  <div class="comment">
    <h1>评论</h1>
    <span>共{{comments.length}}条评论</span>
    <!-- 编辑区 -->
    <div class="comment-edit">
      <el-input
        type="textarea"
        placeholder="期待你的精彩故事"
        v-model="textarea"
        maxlength="300"
        show-word-limit
        :autosize="{ minRows: 4, maxRows: 6}"
      >
      </el-input>
      <el-button class="comment-submit" size="small" type="primary">发表评论</el-button>
    </div>
    <!-- 展示区 -->
    <div class="comment-show">
      <h2>最新评论</h2>
      <span>({{comments.length}})</span>
      <ul class="comment-list" v-for="(item,index) in comments" :key="index">
        <li class="comment-item">
          <img class="avatar" src="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=5f4834870d3b5bb5bad727fc06d2d523/2e2eb9389b504fc2a21e8529ebdde71190ef6d5c.jpg">
          <div class="comment-desc">
            <div class="comment-operator">
              <div class="like active">
                <i class="el-icon-thumb"></i>
                <span>{{item.likedCount}}</span>
              </div>
              <i class="el-icon-chat-dot-square active"></i>
            </div>
            <div class="comment-desc__name">{{item.user.name}}</div>
            <div class="comment-desc__cont">{{item.content}}</div>
            <div class="comment-desc__time">{{timeFormat(item.created)}}</div>
          </div>
          
          <ul class="sub-comments">
            <li class="sub-comment">
              <span class="sub-comment_name">石原里美</span>
              <span>回复</span>
              <span class="sub-comment_replied">有村架纯</span>
              <span>:</span>
              <span class="sub-comment_content">lallalalddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</span>
              <span class="sub-comment_reply_btn">回复</span>
              <span class="sub-comment_time">2019年12月9日</span>
            </li>
            <li class="sub-comment">
              <span class="sub-comment_name">石原里美</span>
              <span>回复</span>
              <span class="sub-comment_replied">有村架纯</span>
              <span>:</span>
              <span class="sub-comment_content">lalddddddddddddddddddddddddd</span>
              <span class="sub-comment_reply_btn">回复</span>
              <span class="sub-comment_time">2019年12月9日</span>
            </li>
            <li class="sub-comment">
              <span class="sub-comment_name">石原里美</span>
              <span>回复</span>
              <span class="sub-comment_replied">有村架纯</span>
              <span>:</span>
              <span class="sub-comment_content">lallddddddddddddddddddddddddddddddddd</span>
              <span class="sub-comment_reply_btn">回复</span>
              <span class="sub-comment_time">2019年12月9日</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getComments} from '@/api/comment.js';
import {utc2beijing} from '@/tools/time.js';
export default {
  name: 'comment',
  data() {
    return {
      textarea:null,
      comments:[],
      page:1
    }
  },
  props:['rid'],
  created() {
    getComments(this.rid,this.page).then((res)=>{
      this.comments = res.data.content;
      console.log('评论',res)
    })
  },
  methods:{
    timeFormat(time) {
      return utc2beijing(time);
    }
  }
}

</script>
<style scoped lang='less'>
@import '../../styles/common.less';
  .comment{
    margin-top: 50px;
    padding-bottom: 50px;
    h1{
      display: inline;
      font-size: @fs-xxl;
      font-weight: @fw-l;
    }
    span{
      margin-left: 10px;
      color: @sub-text-color;
      font-size: @fs-s;
    }
    .comment-edit{
      margin-top: 20px;
      width: 74%;
      .comment-submit{
        float: right;
        margin-top: 15px;
      }
    }
    .comment-show{
      margin-top: 50px;
      h2{
        display: inline;
        font-size: @fs;
        font-weight: @fw-l;
      }
      span{
        font-size: @fs-s;
      }
      .comment-list{
        margin-top: 20px;
        width: 74%;
        .comment-item{
          padding-top: 12px;
          margin-bottom: 40px;
          border-top: 1px solid #ededed;
          overflow: hidden;
          .avatar{
            width: 38px;
            height: 38px;
            border-radius: 50%;
            float: left;
            object-fit: cover;
          }
          .comment-desc{
            margin-left: 48px;
            font-size: @fs-s;
            .comment-desc__name, .comment-desc__time{
              color: @sub-text-color;
            }
            .comment-desc__cont, .comment-desc__time{
              margin: 20px 0;
              width: 700px;
              word-wrap:break-word;
              line-height: 1.3;
            }

          }
          .comment-operator{
            float: right;
            margin-top: 80px;
            margin-right: 10px;
            font-size: @fs-xl;
            .like{
              display: inline;
              margin-right: 15px;
              span{
                margin-left: 5px;
              }
            }
            .active{
              cursor: pointer;
              &:hover{
                color: @color-active;
              }
            }
            &:hover::before{
              content: '举报';
              display: inline;
              color: @color-active;
              font-size: @fs;
              margin-right: 20px;
              cursor: pointer;
            }
          }
        }
        .sub-comments{
          margin:0 auto;
          margin-top: 30px;
          padding:20px 5px;
          width:80%;
          background: #f7f8fa;
          .sub-comment{
            margin-bottom: 30px;
            span{
              vertical-align: top;
            }
          }
          & > li:nth-last-child(1){
            margin-bottom: 0;
          }
          .sub-comment_name,.sub-comment_replied{
            color:#6864c3;
          }
          .sub-comment_time,.sub-comment_reply_btn{
            float: right;
            padding-top: 5px;
          }
          .sub-comment_reply_btn{
            margin-right: 5px;
          }
          .sub-comment_content{
            display: inline-block;
            width: 330px;
            word-wrap:break-word;
          }
        }
      }
    }
  }
</style>