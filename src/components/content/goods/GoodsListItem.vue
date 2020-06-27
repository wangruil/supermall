<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt @load="imageLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: Object,
    default() {
      return {};
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      this.$router.push("/detaial/" + this.goodsItem.iid);   
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  }
};
</script>

<style>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  position: absolute;
  font-size: 12px;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
  overflow: hidden;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
/* 伪元素 */
.goods-info .collect::before {
  /* 在.goods-info .collect添加元素   */
  /* content为添加的内容 */
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>