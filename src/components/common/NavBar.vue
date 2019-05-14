<template>
  <div class="tmpl1">
    <div class="header"></div>

    <mt-header :title="title">
      <!--已经具备返回功能，但不是我们想要的-->
      <!--<router-link to="/" slot="left">-->
      <!--<mt-button icon="back">返回</mt-button>-->
      <!--</router-link>-->

      <!--自定义返回键-->
      <div @click="goBack" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>

      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
  </div>
</template>

<script>
    export default {
        name: "nav-bar",
      props:['title'],//props属性在template中可以直接用
      created() {
          //在这里使用this.title
      },
      methods:{
        goBack(){
          //返回上一层，利用路由的历史记录来返回
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>
  .header{
    width: 100%;
    height: 50px;
  }
  .tmpl1 .mint-header{
    background-color: darkgrey;
    width: 100%;
    position: fixed;
    top: 50px;
    z-index: 1;
  }
</style>
