<template>
  <div class="profile">
    <!--顶部  -->
    <nav-bar class="home-nav">
      <div slot="center">我的</div>
    </nav-bar>
    <!-- 头部 -->
    <profile-top></profile-top>
    <account-info></account-info>
    <user-list :list="orderList"></user-list>
     <user-list :list="serviceList"></user-list>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import ProfileTop from "./childComps/ProfileTop";
import AccountInfo from "./childComps/AccountInfo";
import UserList from "./childComps/UserList";

export default {
  name: "Profile",
  data() {
    return {
      orderList: [
        { icon: "message.svg", info: "我的消息" },
        { icon: "pointer.svg", info: "积分商城" },
        { icon: "vip.svg", info: "会员卡" }
      ],
      serviceList: [
        { icon: "cart.svg", info: "我的购物车" },
        { icon: "shopping.svg", info: "下载购物APP" }
      ]
    };
  },
  components: {
    NavBar,
    ProfileTop,
    AccountInfo,
    UserList
  }
};
</script>

<style scoped>
.profile {
  width: 100%;
  height: 100vh;
  background-color: #f3f3f3;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
