<template>
  <div >
    <!-- 引入返回导航 -->
    <nav-bar title="图文分享"/>

    <!--<div class="content">-->
      <!--本页导航栏-->
      <div class="photo-header">
        <ul>
          <li v-for="category in categories" :key="category.id">
            <!--javascript:是表示在触发默认动作时，执行一段JavaScript代码，而 javascript:; 表示什么都不执行，这样点击时就没有任何反应。-->
            <a href="javascript:;" @click="navigateToCateById(category.id)">{{category.title}} </a>
          </li>
        </ul>
      </div>

      <!--内容主体-->
      <div class="photo-list">
        <ul>
          <li v-for="(item,index) in imgs" :key="index">
            <router-link :to="{name:'PhotoDetail',params:{id:item.id}}">
              <img v-lazy="item.img_url">
              <p>
                <span>{{item.title}}</span>
                <br>
                <span>{{item.zhaiyao}}</span>
              </p>
            </router-link>
          </li>
        </ul>
      </div>

    </div>
  <!--</div>-->
</template>
<script>
  export default {
    data() {
      return {
        imgs: [],// 图片数据
        categories: [],// 分类信息
      }
    },
    beforeRouteUpdate(to, from, next) {
      console.log(to)
      // console.log(from)
      let id = to.query.categoryID;
      console.log(id);

      this.loadImgsById(id);

      next();
    },
    methods: {

      //向路由添加query id信息，重要！！！！！！！！！
      navigateToCateById(id) {
        this.$router.push({
          name: 'PhotoList',
          query: {categoryID: id}
        })
      },
      loadImgsById(id) {
        this.$axios.get('getimages/' + id+'.json')
          .then(res => {
            this.imgs = res.data.message;
            //渲染数据
          }).catch(err => console.log(err));
      },
    },
    created() {

      //获取分类id
      let id = this.$route.query.categroyID;
      // let id = 0;
      console.log(id);
      //发起请求
      this.loadImgsById(id);

      //获取分类信息
      this.$axios.get('getimgcategory.json')
        .then(res => {
          this.categories = res.data.message;
          this.categories.unshift({id: 0, title: '全部'});
        }).catch(err => console.log(err))
    },

  }


</script>
<style scoped>
  .content {
    position: absolute;
    top: 100px;
    bottom: 60px;
    overflow-y: auto;
  }

  /*.content .photo-header{*/
    /*position: absolute;*/
  /*}*/
  /*.content .photo-header li {*/
    /*list-style: none;*/
    /*display: inline-block;*/
    /*margin-left: 10px;*/
    /*height: 30px;*/
  /*}*/

  /*.content .photo-header ul {*/
    /*!*强制不换行*!*/
    /*position: absolute;*/
    /*z-index: 1;*/
    /*white-space: nowrap;*/
    /*overflow-x: auto;*/
    /*!*overflow: hidden;*!*/
    /*padding-left: 0px;*/
    /*margin: 5px;*/
  /*}*/

  /*!*下面的图片*!*/
  /*.content .photo-list {*/
    /*position: relative;*/
    /*top: 30px;*/
    /*width: 400px;*/
  /*}*/

  /*.content .photo-list li {*/
    /*list-style: none;*/
    /*position: relative;*/
  /*}*/

  /*.content .photo-list li img {*/
    /*width: 100%;*/
    /*height: 230px;*/
    /*vertical-align: top;*/
  /*}*/

  /*.content .photo-list ul {*/
    /*padding-left: 0px;*/
    /*margin: 0;*/
  /*}*/

  /*.content .photo-list p {*/
    /*position: absolute;*/
    /*bottom: 0px;*/
    /*color: white;*/
    /*background-color: rgba(0, 0, 0, 0.3);*/
    /*margin-bottom: 0px;*/
  /*}*/

  /*.content .photo-list p span:nth-child(1) {*/
    /*font-weight: bold;*/
    /*font-size: 16px;*/
  /*}*/

  /*image[lazy=loading] {*/
    /*width: 40px;*/
    /*height: 300px;*/
    /*margin: auto;*/
  /*}*/

  .photo-header{
    position: relative;
    top: 50px;
    /*z-index: 1;*/
  }
  .photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
  }

  .photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5px;
  }


  /*下面的图片*/

  .photo-list{
    position: relative;
    top: 50px;
    margin-bottom: 55px;
    /*overflow: auto;*/
    /*bottom: 1px;*/
  }

  .photo-list li {
    list-style: none;
    position: relative;
  }

  .photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
  }

  .photo-list ul {
    padding-left: 0px;
    margin: 0;
  }

  .photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
  }

  .photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
  }


  image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }

</style>
