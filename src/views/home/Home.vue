<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      v-show="isTabFixed"
      :titles="['流行','新款','精选']"
      ref="tabControl1"
      @tabClick="tabClick"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentscroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-Swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-Swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-views></feature-views>
      <tab-control :titles="['流行','新款','精选']" ref="tabControl2" @tabClick="tabClick"></tab-control>
      <good-list :goods="showGoods"  ></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
//公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

//子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureViews from "./childComps/FeatureViews";

import { getHomeMultidata, getHomeGoods } from "network/home";
import  {debouce} from "common/utils"
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureViews,
    BackTop,

    GoodList,
    NavBar,
    TabControl,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      taboffsetTop: 0,
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBack: false,
      isTabFixed: false,
      saveY: 0,
      weiY:sessionStorage.getItem('weiy') || 0,
      itemImgListener: null
    };
  },

  created() {
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  //进来 周期函数
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
     this.$refs.scroll.scrollTo(0, this.weiY, 0);
     console.log(this.weiY)
  },
  deactivated() {
     this.saveY = this.$refs.scroll.getScrollY();
   
  },
 
  mounted() {
    //this.$refs.scroll对图片进行防抖处理
    const refresh = debouce(this.$refs.scroll.refresh, 200);
    //对监听事件进行保存
    this.itemImgListener = () => {
      refresh();
    };
    //监听item图片加载完成
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  methods: {
    
    /* 防抖函数 */
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },

    /* 事件监听的方法 */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.cuuentIndex = index;
      this.$refs.tabControl2.cuuentIndex = index;
    },
    backClick() {
      //回到顶部
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentscroll(position) {
    this.weiY = -position.y
    sessionStorage.setItem('weiy',this.weiY)
     
      //回到顶部按钮的显示与隐藏
      this.isShowBack = -position.y > 1000;
      //决定tabContal是否吸顶
      this.isTabFixed = -position.y > this.taboffsetTop;
    },
    loadMore() {
      //上拉加载更多

      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /* 
网络请求相关的方法
*/
    //1.请求我们的多个数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    //2.请求商品数据
    getHomeGoods(type) {
      // 把goods数组里面得对象得页数加1
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  deactivated(){
  //取消全局事件监听
  this.$bus.$off('itemImageLoad',this.itemImgListener)
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 43px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.content {
  /* height: calc(100%-93px); */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
