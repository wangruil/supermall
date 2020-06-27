<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="imgClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          class="title-item"
          v-for="(item,index) in title"
          :key="index"
          :class="{active:currentIndex==index}"
          @click="colorTitle(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    imgClick() {
      this.$router.go(-1);
    },
    colorTitle(index){
        this.currentIndex=index
        this.$emit("titleClick",index)
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.back img {
  margin-left: 10px;
  margin-top: 10px;
}
.active {
  color: var(--color-high-text);
}
</style>