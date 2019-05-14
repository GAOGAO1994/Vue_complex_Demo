// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
// import Vuex from 'vuex'
//
// Vue.use(Vuex)

//引入全局样式
import '../static/css/global.css'

//引入mint-ai
// import MintUI from 'mint-ui'
// //安装插件
// Vue.use(MintUI) //里面其实做的就是注册所有的全局组件，和给Vue.prototype挂载一些对象，
// 方便你使用组件内的this.xxx就能用了

//  让插件来局部安装mint-ui的组件
import MyMintUIPlugin from '@/plugins/MyMintUIPlugin'
Vue.use(MyMintUIPlugin)



//引入css
import 'mint-ui/lib/style.css'


//引入全局组件 开始
import MyUl from './components/common/MyUl'
import MyLi from './components/common/MyLi'
Vue.component(MyUl.name,MyUl)
Vue.component(MyLi.name,MyLi)
import NavBar from './components/common/NavBar'
Vue.component(NavBar.name,NavBar)

import Comment from './components/common/Comment'
Vue.component(Comment.name,Comment)

import Swipe from './components/common/Swipe'
Vue.component(Swipe.name,Swipe)



//axios开始
import Axios from 'axios'
//给vue的原型挂载$axios
Vue.prototype.$axios = Axios
Axios.defaults.baseURL='../static/json/'


// 定义拦截器
// 引入mint-ui的Indicator
import Indicator from 'mint-ui/lib/indicator';
import 'mint-ui/lib/indicator/style.css';
// 1：请求发起前显示loading open（）；
Axios.interceptors.request.use(function (config) {
  //不变配置：可变，可以设置公共的请求头操作
  // MintUI.Indicator.open({ // 若使用MyMintUIPlugin，则要去掉MintUI
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  })
  return config  //config:{header}
})
//2：响应回来后关闭loading close（）
Axios.interceptors.response.use(function (response) {
  //response:{config:{},data:{},headers:{}}

  //接收响应头或者响应体重的数据，保存起来，供请求的拦截器中使用头信息操作
  // MintUI.Indicator.close()
  Indicator.close()
  // console.log(response)
  return response
})


//引入自己的插件安装器
import Installer from '@/plugins/installer'
Vue.use(Installer)

Vue.config.productionTip = false  // 阻止生产消息

//图片懒加载
import { Lazyload } from 'mint-ui'
Vue.use(Lazyload)


//定义全局过滤器  开始
import Moment from 'moment';
//设置语言为中文！！！！！
Moment.locale('zh-cn')
Vue.filter('convertTime',function(data,formatStr){
  // 2015-04-16T03:50:28.000Z
  let pattern = /(\d+[-]\d+[-]\d+){1}/;
  let getTime = pattern.exec(data);
  // console.log(getTime[0])
  return Moment(getTime[0]).format(formatStr);
  //接收的data时间数据，转为输入的formatStr格式
});

//相对时间过滤器
Vue.filter('relTime',function(data) {
  // 2015-04-16T03:50:28.000Z
  let pattern = /(\d+[-]\d+[-]\d+){1}/;
  let getTime = pattern.exec(data);
  return Moment(getTime[0]).fromNow();
});

//控制字数显示过滤器
Vue.filter("controlShow",function (str,num) {
  //如果当前字符串<num ，返回原值
  if (str.length <= num){
    return str
  } else {
    return str.substr(0,num-1)+'...'
  }
  //如果当前字符串<num ，截取0-num-1位
})

//定义全局过滤器 结束


//vue-preview 开始
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)
//vue-preview 结束


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
