<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button   :is-checked="itemInfo.checked" 
      :value="itemInfo.checked" 
      @click.native="checkClick"></check-button>
    </div>
 
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>

    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥:{{itemInfo.price}}</div>
        <div class="item-count right">X{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
//选项按钮
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartListItem",
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
 methods: {
     //选择按钮
     checkClick(){
         this.itemInfo.checked = !this.itemInfo.checked
     }
 },
  components: {
    CheckButton
  }
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-title,
.item-desc {
  overflow: hidden;
  /* 强制同一行内显示所有文本文字，让所有文字内容中一排显示不换行。 */
  white-space: nowrap;
  /* 多文本溢出显示省略号 */
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-info .item-desc{
    font-size: 14px;
    color: #666;
    margin-top: 15px;

}
.info-bottom{
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    right: 5px;
    left: 10px;
}
.info-bottom .item-price{
    color: orangered;
}
</style>