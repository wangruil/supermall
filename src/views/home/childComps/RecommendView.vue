<template>
  <div class="recommend">
      <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
          <a href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    //首页轮播图下面的四张图片的组件
name:"RecommendView",
props:{
    recommends:{
        type:Array,
        default(){
            return []
        }
    }
},
}
</script>

<style>
.recommend{
    width: 100%;
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
}
.recommend-item{
    flex: 1;
}
.recommend-item img{
    height: 70px;
    margin-bottom: 10px;
    height: 70px;
}
</style>