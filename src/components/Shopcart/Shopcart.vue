<template>
  <div>
    <nav-bar title="购物车"></nav-bar>
    <div class="headerBottom" style="width: 100%; height: 50px; z-index: -1">我是打底</div>
    <div class="pay-detail">
      <ul>
        <li class="p-list" v-for="(good,index) in shopcart" :key="index">
          <!--是否选中标签-->
          <mt-switch v-model="good.isSelected"></mt-switch>
          <img :src="good.img_url">
          <div class="pay-calc">
            <p>{{good.title}}</p>
            <div class="calc">
              <span>￥{{good.sell_price}}</span>
              <span @click="subNum(good)">-</span>
              <span>{{good.num}}</span>
              <span @click="addNum(good)">+</span>
              <a href="javascript:;" @click="del(good,index)">删除</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="show-price">
      <div class="show-1">
        <p>总计(不含运费):</p>
        <span>已经选择商品{{payment.count}}件，总价￥{{payment.total}}元</span>
      </div>
      <div class="show-2">
        <mt-button type="danger" size="large">去结算</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  import MyBus from '@/MyBus'
    export default {
        data(){
            return {
                shopcart:[]
            }
        },
      computed: {
        payment() {
          //件数、金额、是否被选中
          let count = 0
          let total = 0
          this.shopcart.forEach(goods => {
            //如果 勾选
            if (goods.isSelected) {
              count += goods.num
              total += goods.num * goods.sell_price
            }
          })
          return  {total,count}
        }
      },
      methods: {
        getCartList(obj) {
          let goodsList = Object.keys(test.goodsObj)
          goodsList.forEach((item, index) => {
            // console.log(item,index)
            obj.forEach((a, b) => {
              // console.log(a,b)
              if (a.id === parseInt(item)) {
                this.shopcart.unshift(a)
              }
            })
          })
        },
        subNum(good){
          if(good.num === 1){ return}
            good.num--
          // console.log(good.num)
          // test.goodsObj[good.id]--
          this.$store.dispatch('addNumByAct',-1)
        },
        addNum(good){
          good.num++
          // console.log(good.num)
          // test.goodsObj[good.id]++
          this.$store.dispatch('addNumByAct',1)
        },
        del(good,index){
          //删除数组元素
            this.shopcart.splice(index,1)
          //删除test.goodsObj的数据
            delete test.goodsObj[good.id]

          let num = good.num
          this.$store.dispatch('addNumByAct',-num)
        }
      },
      async created(){
          //生成URL
        // let url = 'goods/getshopcarlist/'+Object.keys(test.goodsObj).join(',')
        let url = 'goods/getgoods1.json'
        let goodsList = Object.keys(test.goodsObj)
        console.log(goodsList)

        //这句话导致，按增加键时视图没有更新
        //Object.defineProperty(this,'shopcart'，{
        // set:function(){ //获知视图要更新
        //      //判断shopcart元素 是否还有属性，那这些对象的属性都要这么干
        //      //
        // }
        // })

        //也就是这个行为会将alllist中所有属性进行监视，完成属性的响应式，页面改
        let alllist = (await this.$axios.get(url)).data.message
        this.getCartList(alllist)
        // console.log(this.shopcart)

        //给数组元素添加属性（使用await的时候使用ES6中的map/each/find/findIndex是没有效果）
        for (var i=0;i<this.shopcart.length;i++) {
          let goods = this.shopcart[i]
          let num = test.goodsObj[goods.id]
          if (num){
            //手动完成响应式
            this.$set(goods,'num',num)
            // goods.num = num
            this.$set(goods,'isSelected',true)
            // goods.isSelected = true
          }
        }
      },
      beforeRouteLeave(to,from,next){
          //导航离开该组件的对应路由时调用
        //可以访问组件实例'this'
        let result = confirm('确定要离开吗？')
        if(result){
          //保存用户的编辑数据
          //计算总数
          // let total = Object.values(test.goodsObj).reduce((prev,cur) => prev+cur)
          // MyBus.$emit('shopcartNum',total)

          let total = this.$store.getters.getNum
          this.$store.dispatch('changeNumByAct',total)

          next()
        }else {
          next(false) //取消导航
        }
      }
    }
</script>
<style scoped>
  .pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
  }

  .pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
  }

  .pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
  }

  .pay-detail ul li >:nth-child(1),
  .pay-detail ul li >:nth-child(3) {
    display: inline-block;
  }

  .pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
  }

  .pay-detail ul li >:nth-child(1) {
    line-height: 80px;
  }

  .calc:nth-child(1) {
    color: red;
    font-size: 20px;
  }

  .calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
  }

  .calc a {
    margin-left: 20px;
  }

  .show-1,
  .show-2 {
    display: inline-block;
  }

  .show-1,
  .show-2 {
    margin-left: 30px;
  }

  .show-price {
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
