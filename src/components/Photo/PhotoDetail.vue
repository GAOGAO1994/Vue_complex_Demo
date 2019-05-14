<template>
  <div class="content">
    <nav-bar title="图文细节"/>
    <div class="photo-title">
      <p>{{photoInfo.title}}</p>
      <span>{{photoInfo.add_time | convertTime('YYYY-MM-DD')}}</span>
      <span>{{photoInfo.click}}</span>
      <span>分类：民生经济</span>
    </div>


    <!--这也是一堆li，可以代替之前写的-->
    <vue-preview class="preview" :slides="imgs2">

    </vue-preview>

    <!--<my-ul>-->
      <!--<my-li v-for="(item,index) in imgs" :key="index">-->
        <!--<img :src="item.src" slot="icon">-->
      <!--</my-li>-->
    <!--</my-ul>-->
    <div class="photo-desc">
      <p v-html="photoInfo.content"></p>
    </div>

    <!--使用评论组件-->
    <comment :cid="this.$route.params"></comment>

  </div>

</template>

<script>
    export default {
        name: "PhotoDetail",
      data(){
          return{
              photoInfo:{},
              imgs:[],
            imgs2:[
              {
                src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                alt:'picture1',
                title:'Image1',
                w: 600,
                h: 400
              },
              {
                src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
                msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
                alt:'picture2',
                title:'Image2',
                w: 300,
                h: 600
              }
            ]
          }
      },
      created() {
          let pid = this.$route.params.id
        console.log(this.$route.params)
        //发起请求
        this.$axios.get(`getimageInfo/${pid}.json`)
          .then(res =>{
            this.photoInfo = res.data.message[0]
          }).catch(console.log)

        //获取图片缩略图
        this.$axios.get(`getthumimages/${pid}.json`)
          .then(res =>{
            this.imgs = res.data.message
          }).catch(console.log)
      }
    }
</script>

<style scoped>
  .content{
    position: relative;
    top: 50px;
  }
.preview{
  width: 100%;
}
  /*img{*/
    /*width: 100%;*/
  /*}*/
  li {
    list-style: none;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  .photo-title {
    overflow: hidden;
  }

  .photo-title,
  .photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
  }

  .photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
  }

  .photo-title span {
    margin-right: 20px;
  }

  .photo-desc p {
    font-size: 18px;
  }
</style>
