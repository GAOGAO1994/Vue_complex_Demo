<template>
  <div>
    <!--<img src="./assets/logo.png">-->
    <mt-header fixed title="信息管理系统"></mt-header>

    <!--路由导航的淡入淡出效果-->
    <!--out-in 表示元素先离开，再进入，默认同进同出-->
    <transition name="fade" mode="out-in">
      <router-view class="tmpl"></router-view>
    </transition>
    <!--{{selected}}-->

    <!--底部tabbar-->
    <mt-tabbar v-model="selected">

      <mt-tab-item id="Home">
        <img slot="icon" src="../static/img/index.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="Member">
        <img slot="icon" src="../static/img/vip.png">
        会员
      </mt-tab-item>
      <mt-tab-item id="Shopcart">
        <img slot="icon" src="../static/img/shopcart.png">
        购物车<mt-badge size="small" type="error">{{getNum}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="Search">
        <img slot="icon" src="../static/img/find.png">
        查找
      </mt-tab-item>

    </mt-tabbar>


  </div>
</template>

<script>
  import MyBus from './MyBus'
  import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data(){
    return{
      selected:'',
      totalNumber: 0
    }
  },
  computed:{
    ...mapGetters([
      'getNum'
    ])
  },
  watch:{
    //不能使用箭头函数，因为this会向上绑定
    selected:function (newV,oldV) {
      console.log(newV);
      this.$router.push({
        name:newV,//按名字跳到指定的路由
      })
    }
  },
  created() {
    //GoodsDetail.vue中引用
    // MyBus.$on('addShopcart',(num) =>{
    //   this.totalNumber += num
    // })

    //shopcart.vue中引用
    // MyBus.$on('shopcartNum',(num) =>{
    //   this.totalNumber = num
    // })
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
.mint-tabbar{
  position: fixed;
  bottom: 0;
}
</style>
