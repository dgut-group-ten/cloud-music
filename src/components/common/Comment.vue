<template>
  <div class="comment">
    <h1>评论</h1>
    <span>共1条评论</span>
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
      <span>(1)</span>
      <ul class="comment-list">
        <li class="comment-item">
          <img class="avatar" src="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=5f4834870d3b5bb5bad727fc06d2d523/2e2eb9389b504fc2a21e8529ebdde71190ef6d5c.jpg">
          <div class="comment-desc">
            <div class="comment-desc__name">新垣结衣</div>
            <div class="comment-desc__cont">あなたのことが好きです</div>
            <div class="comment-desc__time">1月8日 13:37</div>
          </div>
          <div class="comment-operator">
            <div class="like active">
              <i class="el-icon-thumb"></i>
              <span>3</span>
            </div>
            <i class="el-icon-chat-dot-square active"></i>
          </div>
        </li>
        <li class="comment-item">
          <img class="avatar" src="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=5f4834870d3b5bb5bad727fc06d2d523/2e2eb9389b504fc2a21e8529ebdde71190ef6d5c.jpg">
          <div class="comment-desc">
            <div class="comment-desc__name">新垣结衣</div>
            <div class="comment-desc__cont">あなたのことが好きです</div>
            <div class="comment-desc__time">1月8日 13:37</div>
          </div>
          <div class="comment-operator">
            <div class="like active">
              <i class="el-icon-thumb"></i>
              <span>3</span>
            </div>
            <i class="el-icon-chat-dot-square active"></i>
          </div>
        </li>
        <li class="comment-item">
          <img class="avatar" src="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=5f4834870d3b5bb5bad727fc06d2d523/2e2eb9389b504fc2a21e8529ebdde71190ef6d5c.jpg">
          <div class="comment-desc">
            <div class="comment-desc__name">新垣结衣</div>
            <div class="comment-desc__cont">あなたのことが好きです</div>
            <div class="comment-desc__time">1月8日 13:37</div>
          </div>
          <div class="comment-operator">
            <div class="like active">
              <i class="el-icon-thumb"></i>
              <span>3</span>
            </div>
            <i class="el-icon-chat-dot-square active"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  data() {
    return {
      textarea:null
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
              margin-top: 10px;
            }

          }
          .comment-operator{
            float: right;
            margin-right: 10px;
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
      }
    }
  }
</style>