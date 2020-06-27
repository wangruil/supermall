<template>
  <div class="content-left">
    <div
      class="left-text"
      :class="currentIndex == index?'active': ''"
      v-for="(item,index) in list"
      :key="index"
      @click="dian(index,item.maitKey)"
    >{{item.title}}</div>
  </div>
</template>

<script>
export default {
  name: "ContentLeft",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: sessionStorage.getItem("color") || 0
    };
  },
  methods: {
    dian(a,b) {
      this.currentIndex = a;
      sessionStorage.setItem("color", a);
      this.$emit('contentright',b)
    }
  },
  mounted() {}
};
</script>

<style scoped>
.content-left {
  width: 100%;
  height: 100%;
}
.left-text {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: black;
}
.active {
  background: #fff;
  color: #ff8198;
}
</style>