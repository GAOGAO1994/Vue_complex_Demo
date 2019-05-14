<template>
  <div>
    <nav-bar :title="title"></nav-bar>

    <!--新闻列表-->
    <div class="demo">
      <ul>
        <li v-for="(news,index) in newsList" :key="index">
         <router-link :to="{name:'NewsDetail',params:{id:news.id}}">
           <img class="" :src="news.img_url">
           <div class="text">
             <span>{{news.title}}</span>
             <div class="news-desc">
               <p>点击数：{{news.click}}</p>
               <p>发表时间:{{news.add_time | convertTime('YYYY年MM月DD日')}}</p>
             </div>
           </div>
         </router-link>
        </li>
        <li class="line"></li>
      </ul>
    </div>
  </div>


</template>

<script>
    export default {
        name: "NewsList",
      data(){
        return{
          title:'新闻列表',
          newsList:[],
        }
      },

      created() {
          this.$axios.get('getnewlist.json')
            .then(res => {
              this.newsList = res.data.message
            }).catch(err => {
              console.log(err)
          })
      }

    }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .demo {
    position: absolute;
    top: 100px;
    padding-top: 10px;
    bottom: 60px;
    /*这里之所以设置1px是因为如果不设置将不会有头部‘悬浮固定’效果，头部将会随页面一起滚动，设置了1px以后滚动条只出现在content区域，从而模拟悬浮固定效果*/
    overflow: auto;
    /*关键代码！可以让content区域出现滚动条而不是整个page区域滚动，配合bottom:1px使用！*/
    /*align-content: center;*/
  }
  .demo a {
    display: block;
    width: 330px;
    height: 44px;
    color: #000;
    padding-left:20px;
  }
  .demo img {
    float: left;
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }
  .demo a div {
    float: left;
    width: 238px;
    margin-right: 20px;
  }
  .demo span {
    display: block;
    width: 100%;
    font-size: 16px;
    line-height: 21px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .demo a p {
    float: left;
    color: #0bb0f5;
    font-size: 14px;
    line-height: 21px;
  }
  .demo p:nth-child(2) {
    float: right;
  }

  .demo ul {
    padding: 0;
  }
  .news-desc {
    height: 35px;
  }

  /*先临时这么写*/


</style>
