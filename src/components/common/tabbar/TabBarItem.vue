<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :class="{active:isActive}">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  //父传子  传过来的path是string类型
  props: { path: String },
  data() {
    return {
      //   isActive: true
    };
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    }
  },
  computed: {
    isActive() {
      //indexOf 如果没有在指定的数据中找到  则返回-1
     
        return this.$route.path.indexOf(this.path) !== -1;
     
    }
  }

};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}
.active {
  color: red;
}
</style>