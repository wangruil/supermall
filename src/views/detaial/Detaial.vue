<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :good="good"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <toast></toast>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";
import Toast from "@/components/common/toast/Toast";

import Scroll from "components/common/scroll/Scroll";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { debouce } from "common/utils.js";
export default {
  name: "Detaial",

  data() {
    return {
      iid: null,
      topImages: [],
      good: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Toast,

    Scroll
  },
  created() {
    //1.获取iid
    this.iid = this.$route.params.iid;
    //2.请求详情数据
    getDetail(this.iid).then(res => {
      //1.获取顶部的图片轮播数据
      var data = res.result;
      this.topImages = data.itemInfo.topImages;

      //2.获取商品信息
      this.good = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //6.取出评论的信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
    //给getThemeTopY赋值进行防抖
    this.getThemeTopY = debouce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
    }, 100);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    //滚动内容显示对应标题
    contentScroll(position) {
      //1.获取y值
      const positionY = -position.y;
      //2.position与主题中值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    //加入购物车
    addCart() {
      //获取购物车需要展示的信息  图片 名称 描述 价格 id
      const product = {};
      product.image = this.topImages[0];
      product.title = this.good.title;
      product.desc = this.good.desc;
      product.price = this.good.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车里
      //  this.$store.cartList.push(product)
      this.$store.dispatch("addCart", product).then(res => {
        console.log(res);
        this.$toast.show(res, 2000);
      });
    }
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
  destroyed() {
    //取消全局事件监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>