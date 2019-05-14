<template>

  <div>
    <div class="headerBottom">我是打底</div>
    <my-swipe url="getlunbo.json"></my-swipe>

    <!--九宫格-->
    <div class="grid">
      <my-ul>
        <my-li v-for="(module,index) in modules" :key="index">
          <router-link :to="module.route">
            <span :class="module.className"></span>
            <div>{{module.title}}</div>
          </router-link>
        </my-li>
      </my-ul>
    </div>



  </div>
</template>

<script>
    export default {
        name: "Home",
      data(){
          return{

            modules:[
              {title:'新闻资讯',className:'back-news',route:{name:'NewsList'}},
              {title:'图文分享',className:'back-pic',route:{name:'PhotoList',query:{categroyID:0}}},
              {title:'商品展示',className:'back-goods',route:{name:'GoodsShow',params:{page:1}}},
              {title:'留言反馈',className:'back-feed',route:{name:'Home'}},
              {title:'搜索咨询',className:'back-search',route:{name:'Home'}},
              {title:'联系我们',className:'back-callme',route:{name:'Home'}}
            ]
          }
      },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .headerBottom{
    width: 100%;
    height: 49px;
    z-index: 0;
    border: none;
  }

.grid span {
  display: inline-block;
  margin: 10px 0;
  width: 50px;
  height: 50px;
  background-repeat: round;
}


  /*九宫格样式*/
.back-pic {
  background-image: url(../../static/img/picShare.png);
}
.back-goods {
  background-image: url(../../static/img/goodsShow.png);
}
.back-feed {
  background-image: url(../../static/img/feedback.png);
}
.back-search {
  background-image: url(../../static/img/search.png);
}
.back-callme {
  background-image: url(../../static/img/callme.png);
}
.back-news {
  background-image: url(../../static/img/news.png);
}
</style>
