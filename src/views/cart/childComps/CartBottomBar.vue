<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-Button  
      class="check-button"
       :is-checked="isSelectAll"
       @click.native="checkedClick"></check-Button>
      <span>全选</span>
    </div>

    <div class="price">
        合计：{{totalprice}}
    </div>

    <div class="cal" @click="goAccount">
        去计算：({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  methods: {
    checkedClick(){
      if(this.isSelectAll){
        this.$store.state.cartList.forEach(item=>item.checked = false)
      }else{
          this.$store.state.cartList.forEach(item=>item.checked = true)
      }
    },
    //结算
   goAccount(){
     if(!this.isSelectAll){
       this.$toast.show('请选择要购买得商品')
     }
   }

  },
  computed: {
      totalprice(){
          return '￥' + this.$store.state.cartList.filter(item=>{
              return item.checked
          }).reduce((preValue,item)=>{
              //preValue前一个值，reduce
              return preValue+item.price*item.count
          },0).toFixed(2)
      },
      //去计算后面得选择数量
      checkLength(){
          return this.$store.state.cartList.filter(item=>item.checked).length
      },
      //全选
      isSelectAll(){
        if(this.$store.state.cartList.length === 0){
          return false
        }
        return !this.$store.state.cartList.find(item =>!item.checked)
      }
      
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
line-height: 40px;
  position: relative;
  display: flex;
  font-size: 14px;
 background-color: #eee;
 
}
.check-content{
    display: flex;
    margin-left: 10px;
    margin-right: 5px;
    align-items: center;
    width: 60px;
}
.check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
}
.price{
    margin-left: 20px;
    flex: 1;
}
.cal{
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
}
</style>