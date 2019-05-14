# myfirstvdemo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Details：

基于Vue2.0和mint-ui的综合项目，熟悉vue生命周期、数据视图及组件思想，实现组件复用、过滤器使用、拦截器实现加载动画、父子组件传参、路由切换动效等功能

**技术栈：**vue + vue-router + axios + vuex + mixin

**页面包含：**

- 首页 
- - 轮播
- - 图文分享
  - - 图文导航：列表切换功能
    - 图文列表：图片懒加载
    - 图文详情
    - - 图片查看：vue-preview插件
      - 用户评论：moment.js时间管理插件
  - 新闻资讯
  - - 新闻列表
  - - 新闻详情
  - 商品展示
  - - 商品列表：loadmore加载更多
    - 商品详情：添加购物车（小球动效）、图文介绍、商品评论
- 会员 
- 购物车
- - 购物车商品数量的动态更新、商品总价计算等功能（vuex状态管理）
- 查找 

**！！请在imgs文件夹中查看项目图片**
