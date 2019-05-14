<template>
  <div class="tmpl">
    <div class="photo-bottom">
      <ul>
        <li class="photo-comment">
          <div>
            <span>提交评论</span>
            <span @click="goBack"><a>返回</a></span>
          </div>
        </li>
        <li class="txt-comment">
          <textarea style="width: 100%" v-model="content"></textarea>
        </li>
        <li>
          <mt-button type="primary" size="large" @click="sendMsg">发表评论</mt-button>
        </li>
        <li class="photo-comment">
          <div>
            <span>评论列表</span>
            <span>{{msgs.length}}条评论</span>
          </div>
        </li>
      </ul>
      <ul class="comment-list">
        <li v-for="(msg,index) in msgs" :key="index">
          {{msg.user_name}}: <p>{{msg.comment}}</p>
          <p>{{msg.add_time | relTime}}</p>
        </li>
      </ul>
      <mt-button size="large" type="danger" plain @click="loadMsgByPage" :disabled="disabled">加载更多{{page}}</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "comment",
    data() {
      return {
        msgs: [],//评论信息
        content: '',//发表的评论
        page: 1,
        disabled:false
      }
    },
    props: ['cid'],
    methods: {
      goBack(){
        this.$router.go(-1)
      },
      init() {
        this.page = 1
      },

      //？？？？？？？
      sendMsg() {
        // console.log(this.content)
        //获取当前时间
        function getNowFormatDate() {
          var date = new Date();
          var seperator1 = "-";
          var seperator2 = ":";
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
          return currentdate;
        }

        // this.init()
        let str = `{
      "user_name": "匿名用户",
      "add_time": "${getNowFormatDate()}",
      "comment": "${this.content}"
    }`//获取不到内部的key，有问题，待解决！！！！！
        let obj = JSON.parse(str) //将字符串转为JSON格式！！！！！！

        this.msgs.unshift(obj)
        // console.log(this.msgs)
        // this.loadMsgByPage()
        /*
          //搞不清到底如何使用axios向后台传送数据，所以使用替代方案，先把正确的方式写在下方
          // this.$axios.post(`getComment/${this.cid}`)
          this.$axios.post('getcomments.json', `{
      "user_name": "匿名用户",
      "add_time": "${getNowFormatDate()}",
      "comment": "${this.content}"
    }`)
            .then(res => {
              //页码归1
              this.init()
              console.log(res)
              //加载最新的数据，第一页的数据
              this.loadMsgByPage()
            }).catch(console.log)
          */
      },


      loadMsgByPage() {
        // this.$axios.get(`getComments/${this.cid}?pageindex=${this.page}`)
        this.$axios.get(`getcomments.json`)
          .then(res => {
            //判断响应数据是否不足10条，如果是，禁止按钮并
            if (res.data.message.length < 10 && this.page!==1) {
              //给于提示，mint-ui已经将组件封装好，直接用就可以
              this.$toast({
                message: '没有更多',
                iconClass: 'icon icon-success'
              })
              //禁止按钮再次点击
              this.disabled = true
              return ;
            }
            //有时赋值，有时添加，需要判断
            // if (this.page === 1){
            this.msgs = res.data.message
            // }else {
            //   this.msgs = this.msgs.concat(res.data.message)
            // }
             this.page++
          }).catch(console.log)
      },
    },
    created() {
      // this.$axios.get(`getcomments/${this.cid}?pageindex=1`)
      this.loadMsgByPage()
    }

  }
</script>

<style scoped>
  .photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
  }

  .photo-comment > div span:nth-child(2) {
    float: right;
  }

  .photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
  }

  .txt-comment {
    padding: 5px 5px;
  }

  .txt-comment textarea {
    margin-bottom: 5px;
  }

  .comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
  }

  li {
    list-style: none;
    /*overflow: hidden;*/
    /*white-space: nowrap;*/
    word-break: break-all;
    width: 97%;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  ul p {
    margin: 0;
    padding: 0;
  }

</style>
