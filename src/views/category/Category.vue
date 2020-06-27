<template>
  <div class="wrapper">
    <!--顶部  -->
    <nav-bar class="home-nav">
      <div slot="center">分类</div>
    </nav-bar>
    <!-- 分类左边 -->
    <scroll class="content">
      <content-left :list="title" @contentright="contentright"></content-left>
    </scroll>
    <!-- 分类右边 -->
    <scroll class="content-right" ref="scroll"   :probe-type="3"
      @scroll="contentscroll">
      <content-right :msg="msg"></content-right>
    </scroll>
      <back-top @click.native="backClick" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import NavBar from "components/common/navbar/NavBar";
import ContentLeft from "./childComps/ContentLeft";
import ContentRight from "./childComps/ContentRight";
import BackTop from "components/content/backTop/BackTop";
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "../../network/category";
export default {
  name: "Category",
  data() {
    return {
      title: [],
      msg:JSON.parse(sessionStorage.getItem('mg')) || [],
      isShowBack:false
    };
  },
  methods: {
    //1.请求我们的多个数据
    getCategory() {
      getCategory().then(res => {
        this.title = res.data.category.list;
      });
    },
     //请求分类右边数据
    a_getSubcategory(maitkey) {
      
      getSubcategory(maitkey).then(res => {
        this.msg = res.data.list
        
        var obj = JSON.stringify(res.data.list)
         sessionStorage.setItem('mg',obj)
      });
    },
    //请求分类右边数据
    contentright(a) {
      this.a_getSubcategory(a);
    },
    //回到顶部
      backClick() {
     
      this.$refs.scroll.scrollTo(0, 0);
    },
      contentscroll(position) {
      //回到顶部按钮的显示与隐藏
      this.isShowBack = -position.y > 500;
      //决定tabContal是否吸顶
      
    },
  },
  components: {
    NavBar,
    ContentLeft,
    ContentRight,
    BackTop,
    Scroll
  },
  created() {},
  mounted() {
    //querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。
    // this.scroll = new BScroll(document.querySelector('.wrapper'), {});
    this.getCategory();
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  /* height: calc(100%-93px); */
  overflow: hidden;
  position: absolute;
  width: 25%;
  top: 44px;
  bottom: 49px;
  left: 0;
  background-color: #f3f3f3;
}
.content-right {
  float: right;
  overflow: hidden;
  position: absolute;
  width: 75%;
  top: 44px;
  bottom: 49px;
  right: 0;
  background-color: #f3f3f3;
  
}
</style>
