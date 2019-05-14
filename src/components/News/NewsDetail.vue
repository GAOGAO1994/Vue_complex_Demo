<template>
  <div class="tmp1">
    <nav-bar :title="myTitle"></nav-bar>
    <div class="news-detail">
    <div class="news-title">
      <p>{{newsInfo.title}}</p>
      <div>
        <span>点击量：{{newsInfo.click}}</span>
        <span>分类：民生经济</span>
        <span>{{newsInfo.add_time | convertTime('YYYY-MM-DD')}}</span>
      </div>
    </div>
      <!--因为返回的内容是带有HTML标签的，所以必须加上v-html描述-->
      <!--注意！！！v-html中的样式只能放置在全局环境中，将内容的样式放入global.css中-->
    <div class="news-content" v-html="newsInfo.content"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NewsDetail",
      data() {
        return {
          myTitle:'',
          newsInfo:{}, // 新闻详情数据
        }
      },
      created() {

          // this.title = this.$router.data.title
        // 1: 获取路由参数
        let { id } = this.$route.params;
        // console.log(id)

        // 2: 拼接后台url发起请求
        let url = 'getnews/'+id+'.json';
        this.$axios.get(url)
          .then(res =>{
            // 3: 响应的数据渲染到页面上，通过一个详情对象
            this.newsInfo = res.data.message[0]
          }).catch(err =>{
            console.log(err)
        })
        console.log(id);
      },
      beforeRouteEnter(to,from,next){
        let title = '';

        //1、判断from是新闻列表还是商品详情
        if (from.name === 'NewsList'){
          title = '新闻详情'
        }else if (from.name === 'GoodsDetail') {
          title = '商品图文信息'
        }

          next(vm =>{
            //这里没有this，因为组件还没有被实例化
            //通过‘vm’访问组件实例
            vm.myTitle = title;
          })
      }
    }
</script>

<style scoped>
  .news-detail{
    position: absolute;
    top: 100px;
    bottom: 60px;
    overflow: auto;
  }

  .news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
  }

  .news-title span {
    margin-right: 30px;
  }

  .news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }


  /*主体文章的左右距离*/

  .news-content {
    padding: 10px 5px;
  }
</style>
