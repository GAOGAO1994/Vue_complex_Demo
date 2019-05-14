<template>
  <mt-swipe :auto="4000">
    <!--v-for的时候，需要给key，避免vue计算key，来提升性能-->
    <!-- key就是位置的标识 -->
    <mt-swipe-item v-for="(item,index) in imgs||my_imgs" :key="index" class="mint-swipe">
      <img :src="item.img||item.srr" alt="item.alt" style="width: 100%; height: 100%">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
  export default {
    name: "my-swipe",
    props: ['url','imgs'],
    data() {
      return {
        my_imgs: [],//轮播图数据
        //my_imgs:this.imgs的修改不会影响外部的this.imgs的重新渲染
        //子接收父的属性再去做显示，也不能显示成功，内部执行时机问题
      }
    },
    created() {
      //!!!!!!!父传递给子的组件，子在接收成为自己的属性后，发生改变的话，不会触发视图更新

      //兼容传递方式
      if (this.url){
        this.$axios.get(this.url)
          .then(res => {
            this.my_imgs = res.data.message
          }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  .mint-swipe{
    width: 100%;
    height: 250px;
  }
  .mint-swipe img{
    width: 100%;
    height: 100%;
  }
  .mint-swipe img{
    width: 100%;
  }
</style>
