<template>
  <div>
    <nav-bar :title="myTitle"/>
    <div style="{width: 100%; height: 50px; z-index: -1}"></div>
    <!--<go-back-header title="商品详情"></go-back-header>-->
    <div class="outer-swiper">
      <div class="swiper">
        <my-swipe :imgs="imgs"></my-swipe>
      </div>
    </div>
    <div class="product-desc">
      <ul>
        <li><span class="product-desc-span">
                    {{info.title}}
                </span></li>
        <li class="price-li">市场价：
          <s>￥{{info.market_price}}</s> 销售价：<span>￥{{info.sell_price}}</span></li>
        <li class="number-li">购买数量：<span @click="subNum">-</span><span>{{buyNumber}}</span><span @click="addNum">+</span></li>
        <li>
          <mt-button type="primary">立即购买</mt-button>
          <mt-button type="danger" @click="addShopCard">加入购物车</mt-button>
        </li>
      </ul>
    </div>

    <!--过渡效果 内置组件 transition-->
    <transition name="ball" @after-enter="afterEnter">
      <div class="ball" v-if="isShow"></div>
    </transition>
    <div class="product-props">
      <ul>
        <li>商品参数</li>
        <li>商品货号：{{info.goods_no}}</li>
        <li>库存情况：{{info.stock_quantity}}件</li>
        <li>上架时间：{{info.add_time | convertTime('YYYY-MM-DD')}}</li>
      </ul>
    </div>
    <div class="product-info">
      <ul>
        <li>
          <mt-button type="primary" size="large" plain @click="goGoodsInfo">图文介绍</mt-button>
        </li>
        <li>
          <mt-button type="danger" size="large" plain @click="goGoodsComment">商品评论</mt-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  // import MyBus from '@/MyBus'
  import GoodsTools from '@/GoodsTools'
  import {mapActions} from 'vuex'
    export default {
        name: "GoodsDetail",
      data(){
          return{
            goodsId:this.$route.query.id,
            info:{}, //商品信息
            imgs:[], //轮播图
            myTitle:'商品介绍',
            isShow:false,
            buyNumber:1
          }
      },
      // props:['page'],
      methods:{
        goGoodsInfo(){
          //直接进入到新闻详情页
          this.$router.push({
            name:'NewsDetail',
            params:{
              id:this.goodsId
            }
          })
        },
        goGoodsComment(){
          this.$router.push({
            name:'GoodsComment',
            query:{
              id:this.$route.query.id
            }
          })
        },
        subNum(){
          if(this.buyNumber === 1)
            {return}
          this.buyNumber--
        },
        addNum(){
          if (this.info.stock_quantity === this.buyNumber)
           { return}
          this.buyNumber++
        },
        addShopCard(){
          this.isShow = true
        },
        //这是transition组件定义的方法，小球消失后的动作
        afterEnter(){
          this.isShow = false
          //加入数据
          GoodsTools.addShopcart(this.info.id,this.buyNumber)
          // MyBus.$emit('addShopcart',this.buyNumber)
          this.addNumByAct(this.buyNumber)  //相应的App.vue中添加的$on就可以去除了
        },
        ...mapActions([
          'addNumByAct',
          'changeNumByAct'
        ])
      },

      created() {
          //商品轮播图 getthumimages/:imgid
        //商品信息 goods/getinfo/:goodsid
        //请求一个失败了就算失败，可以通过 $axios.all([promise1,promise2]).then(传播响应).catch()
        // let imgReq = this.$axios.get(`getthumimages/${this.goodsId}`)
        // let infoReq = this.$axios.get(`goods/getinfo/${this.goodsId}`)
        let imgReq = this.$axios.get(`getlunbo.json`)
        let infoReq = this.$axios.get(`goods/getgoods1.json`)
        // console.log(imgReq) //是Promise对象

        //发请求，这样做是为了要么都出现，要么都不出现！！！
        this.$axios.all([imgReq,infoReq])
          .then(this.$axios.spread(
            (imgRes,infoRes)=>{
              this.imgs = imgRes.data.message
              this.info = infoRes.data.message[this.goodsId-1]
              // console.log(this.info)
            })
          ).catch(console.log)
      },

    }
</script>

<style scoped>
  .ball-enter-active {
    animation: bounce-in 0.5s;
  }
  /*元素被移除前默认有一个透明度1的显示*/
  .ball-leave{
    opacity: 0;
  }

  @keyframes bounce-in {
    0% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(140px, -50px, 0);
    }
    75% {
      transform: translate3d(160px, 0px, 0);
    }
    100% {
      transform: translate3d(140px, 300px, 0);
    }
  }

  .swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
  }

  .outer-swiper,
  .product-desc,
  .product-props,
  .product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
  }


  /*请ulpadding*/

  .outer-swiper ul,
  .product-desc ul,
  .product-props ul,
  .product-info ul {
    padding: 0;
  }

  .product-desc ul li,
  .product-props ul li,
  .product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
  }

  .product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
  }

  .product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }

  .product-desc ul,
  .product-info ul,
  .product-props ul {
    padding-left: 10px;
  }

  .price-li span {
    color: red;
    font-size: 25px;
  }

  .price-li s {
    margin-right: 16px;
  }


  /*加减*/

  .number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
  }


  /*商品参数*/

  .product-props ul >:nth-child(1) {
    text-align: left;
  }

  .product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
  }

  .product-info ul {
    margin-bottom: 70px;
    padding: 0px 5px;
  }

  .number-li span {
    text-align: center;
  }

  .number-li >:nth-child(2) {
    width: 40px;
  }

  .ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
  }
</style>
