import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
//@的配置在build/webpack.base.conf.js中，'@': resolve('src'),用来代替src

// 将import XXX from 'xxxxx'改为以下形式，实现路由懒加载的第一步---组件按组分块
const  Home = () => import( '@/components/Home.vue')
const  Member = () => import( '@/components/Member/Member.vue')
const  Shopcart = () => import( '@/components/Shopcart/Shopcart')
const  Search = () => import( '@/components/Search/Search')
const  NewsList = () => import( '@/components/News/NewsList')
const  NewsDetail = () => import( '@/components/News/NewsDetail')
const  PhotoList = () => import( '@/components/Photo/PhotoList')
const  PhotoDetail = () => import( '@/components/Photo/PhotoDetail')
const  GoodsShow = () => import( '@/components/Goods/GoodsShow')
const  GoodsDetail = () => import( '@/components/Goods/GoodsDetail')
const  GoodsComment = () => import( '@/components/Goods/GoodsComment')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Home',
      component:Home
    },
    {
      path:'/member',
      name:'Member',
      component:Member
    },
    {
      path:'/shopcart',
      name:'Shopcart',
      component:Shopcart
    },
    {
      path:'/search',
      name:'Search',
      component:Search
    },
    {
      path:'/news/list',
      name:'NewsList',
      component:NewsList
    },
    {
      path:'/news/detail/:id',
      name:'NewsDetail',
      component:NewsDetail
    },
    {
      path:'/photo/list',//query方式不用特殊配置
      name:'PhotoList',
      component:PhotoList

    },
    {
      path:'/photo/detail/:id',
      name:'PhotoDetail',
      component:PhotoDetail
    },
    {
      path:'/goods/list/:page',
      name:'GoodsShow',
      component:GoodsShow
    },
    {
      path:'/goods/detail',
      name:'GoodsDetail',
      component:GoodsDetail
    },
    {
      path:'/goods/detail/comment',
      name:'GoodsComment',
      component:GoodsComment
    }
  ]
})
