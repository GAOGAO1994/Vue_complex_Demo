<template>
  <div class="tmpl" :style="{height:wrapperHeight+'px'}" ref="wrapper">
    <nav-bar title="商品列表"/>
    <div class="headerBottom"></div>
    <mt-loadmore :bottom-method="loadBottom"
                 @bottom-status-change="handleBottomChange"
                 :bottom-all-loaded="allLoaded" :auto-fill="autoFill" ref="loadmore" style="margin-bottom: 55px">
      <ul>
        <li v-for="(goods,index) in goodsList" :key="index">
          <router-link :to="{name:'GoodsDetail',query:{id:goods.id}}">
            <img :src="goods.img_url">
            <!--<div class="title">{{goods.title | controlShow(12)}}</div>-->
            <div class="title">{{goods.title}}</div>
            <div class="desc">
              <div class="sell">
                <span>￥{{goods.sell_price}}</span>
                <s>￥{{goods.market_price}}</s>
              </div>
              <div class="detail">
                <div class="hot">
                  热卖中
                </div>
                <div class="count">
                  剩{{goods.stock_quantity}}件
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
    export default {
        name: "GoodsShow",
      data(){
          return{
            goodsList:[],
            allLoaded: false,//为true禁止拉动函数
            autoFill:false,//自动调用LoadBottom直到撑满父容器
            page:this.$route.params.page,
            // bottomStatus: '',
            wrapperHeight: 0
          }
      },
      methods:{
        loadBottom(){
          this.loadGoodsByPage()
          console.log('上拉调用了')
          //通知状态改变
          this.$refs.loadmore.onBottomLoaded();
        },
        handleBottomChange(status){
          console.log(status)
        },
        loadGoodsByPage(){
          this.$axios.get(`goods/getgoods${this.page}.json`)
            .then(res =>{
              if(this.page <= 1){
                this.goodsList = res.data.message
                // console.log(this.page)
              } else {
                this.goodsList = this.goodsList.concat(res.data.message)
                console.log(this.page)
              }
              this.page++
            }).catch(res =>{
              //如果没有数据了，显示没有更多
              //没有数据了
              this.$toast('没有更多数据了')
              this.allLoaded = true
            //但是拦截器还继续加载中，如何关闭！！！！？？？？？
          }
          )
        }
      },
      created() {
          //获取页码，直接在data中定义好
        // let ipage = this.$route.params.page
          this.loadGoodsByPage()
      },
      mounted() {
        //父容器高度（可视） = 设备高度 - 父容器的top
        this.wrapperHeight = document.documentElement.clientHeight
          - this.$refs.wrapper.getBoundingClientRect().top
      }
    }
</script>

<style scoped>

  ul {
     padding: 10px;
    overflow: hidden;
    /*position: relative;*/
    /*top: 50px;*/
    padding-top: 0;
  }
  .headerBottom{
    width: 100%;
    height: 50px;
    z-index: -1;
  }
  li {
    width: 50%;
    float: left;
    padding: 10px;
    box-sizing: border-box;
  }
  .title{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  li > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
    width: 100%;
    display: block;


  }

  li > a:not(.mui-btn) img {
    width: 100%;
  }

  .sell > span {
    float: left;
    color: red;
    text-align: left;
  }

  .detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
  }

  .detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
  }


  /*撑开，去除浮动没有的高度*/

  .detail {
    overflow: hidden;
  }

  .desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
  }

  img {
    height: 200px;
  }
</style>
