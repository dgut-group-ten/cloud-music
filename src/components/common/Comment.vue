<template>
  <div class="comment" v-if="comments">
    <h1>评论</h1>
    <span>共{{comments.totalElements}}条评论</span>
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
      <el-button class="comment-submit" size="small" type="primary" @click="commentMainFloor">发表评论</el-button>
    </div>
    <!-- 展示区 -->
    <div class="comment-show">
      <h2>最新评论</h2>
      <span>({{comments.totalElements}})</span>
      <ul class="comment-list">
        <li class="comment-item" v-for="(item,index) in curList" :key="index">
          <img class="avatar" src="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=5f4834870d3b5bb5bad727fc06d2d523/2e2eb9389b504fc2a21e8529ebdde71190ef6d5c.jpg">
          <div class="comment-desc">
            <div class="comment-operator">
              <div class="like active">
                <i class="el-icon-thumb"></i>
                <span>{{item.likedCount}}</span>
              </div>
              <span class="active" @click="showSubfloorBlock">回复(0)</span>
            </div>
            <div class="comment-desc__name">{{item.user.name}}</div>
            <div class="comment-desc__cont">{{item.content}}</div>
            <div class="comment-desc__time">{{timeFormat(item.created)}}</div>
          </div>
          <!-- 子楼评论 -->
          <div class="sub-comment-block" style="display:none;">
            <el-button class="sub-comment-block_submit" size="mini" @click="commentSubFloor(index)">发表</el-button>
            <el-input
            class="sub-comment-block_edit"
              type="textarea"
              placeholder="哥们，来个神回复"
              v-model="subTextarea"
              maxlength="300"
              show-word-limit
              :autosize="{ minRows: 2, maxRows: 6}"
            >
            </el-input>
          </div>
          <!-- 子评论 -->
          <ul class="sub-comments" v-if="item.commentList.length !== 0">
            <li class="sub-comment" v-for="(subItem,subIndex) in item.commentList" :key="subIndex">
              <span class="left">
                <span class="sub-comment_name">{{subItem.user.name}}</span>
                <span v-if="subItem.repliedUser.uid !== item.user.uid">回复</span>
                <span class="sub-comment_replied" v-if="subItem.repliedUser.uid !== item.user.uid">{{subItem.repliedUser.name}}</span>
                <span>:</span>
                <span class="sub-comment_content">{{subItem.content}}</span>
              </span>
              <span class="sub-comment_reply_btn">回复</span>
              <span class="sub-comment_time">{{timeFormat(subItem.created)}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <!-- 加载更多 -->
      <div class="load-more">
        <el-button @click="loadMore" type="text" v-if="isHasMore">加载更多</el-button>
        <el-button type="text" v-else>别点了，真的一滴都没有了</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {getComments, commentOnPlaylist, commentOnComment} from '@/api/comment.js';
import {utc2beijing} from '@/tools/time.js';
export default {
  name: 'comment',
  data() {
    return {
      textarea:null,
      comments:null,
      curPage:1,
      curList:[],
      isHasMore:true,
      subTextarea:null,
      pastTarget:null,
      pastTextEl:null
    }
  },
  props:['rid'],
  created() {
    this.loadComments();
  },
  methods:{
    // 时间格式化
    timeFormat(time) {
      return utc2beijing(time);
    },
    // 加载更多
    loadMore(){
      this.curPage++;
      getComments(this.rid,this.curPage,5).then((res)=>{
        if(res.data.content.length !== 0) { this.curList.push(...res.data.content); }
        else{ this.isHasMore = false; }
      })
    },
    // 加载评论
    loadComments(){
      getComments(this.rid,this.curPage,5).then((res)=>{
        this.comments = res.data;
        this.curList = this.comments.content;
      })
    },
    // 主楼评论
    commentMainFloor(){
      if(!this.textarea){
        this.$message('别闹！你什么都没写好么！');
      }
      commentOnPlaylist(this.textarea,this.rid)
      .then((res)=>{
        this.$message({
          message: '上传成功。整个世界将传扬你的惊世之作！',
          type: 'success'
        });
        this.textarea = null;
        this.loadComments();
      })
    },
    // 子楼评论
    commentSubFloor(index){
      if(!this.subTextarea){
        this.$message('别闹！你什么都没写好么！');
      }
      commentOnComment(this.subTextarea,this.rid,this.curList[index].cid)
      .then((res)=>{
        this.$message({
          message: '上传成功。整个世界将传扬你的惊世之作！',
          type: 'success'
        });
        this.subTextarea = null;
        this.loadComments();
      })
    },
    // 展开子楼评论区
    showSubfloorBlock(e){
      const target = e.currentTarget.parentNode.parentNode.parentNode.children[2];
      if(!this.isExpand(e)){
        // 将之前打开的子楼关闭
        if(this.pastTarget !== null && this.pastTarget !== target){
          this.pastText.innerHTML = '回复(0)';
          this.pastTarget.style.display = 'none';
        }
        // 记录打开过的子楼相关信息
        this.pastTarget = target;
        this.pastText = e.currentTarget;
        this.subTextarea = null;
        target.style.display = 'block';
      } else {
        target.style.display = 'none';
      }
    },
    // 判断子楼是否以及展开
    isExpand(e){
      if(e.currentTarget.innerHTML[0] === '回') {
        e.currentTarget.innerHTML = '收起回复';
        return false;
      } else {
        e.currentTarget.innerHTML = '回复(0)';
        return true;        
      }
    }
  },
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
          margin-bottom: 5px;
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
          margin-top: 10px;
          margin-bottom: 10px;
          padding:20px 5px;
          width:80%;
          background: #f7f8fa;
          line-height: 1.5;
          .sub-comment{
            margin-bottom: 30px;
            span{
              vertical-align: top;
            }
            .left{
              display: inline-block;
              width: 510px;
              word-wrap:break-word;
              .sub-comment_name,.sub-comment_replied{
                color:#6864c3;
              }
            }
            .sub-comment_time,.sub-comment_reply_btn{
              float: right;
            }
            .sub-comment_reply_btn{
              margin-right: 5px;
            }
          }
          & > li:nth-last-child(1){
            margin-bottom: 0;
          }
        }
        .sub-comment-block{
          width:80%;
          margin: 5px auto;
          padding: 10px;
          border-radius: 10px;
          background: #f7f8fa;
          .sub-comment-block_submit{
            float: right;
          }
          .sub-comment-block_edit{
            width:90%;
          }
        }
      }
      .load-more{
        width: 35%;
        margin:0 auto;
      }
    }
  }
</style>