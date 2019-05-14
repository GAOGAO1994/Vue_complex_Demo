let obj = {
  goodsObj:{}, //初始数据
  addShopcart(id,num) {
    //新加key或者追加value
    if (this.goodsObj[id]){
      this.goodsObj[id] += num
    }else {
      this.goodsObj[id] = num
    }
  },
  deleteGoods(){

  }
}


window.test = obj //挂个window
export default obj
