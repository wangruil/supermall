<template>
  <div class="nav-bar">
      <div class="left"><slot name="left"></slot> </div>
         <div class="center"><slot name="center"></slot> </div>
            <div class="right"><slot name="right"></slot> </div>
  </div>
</template>

<script>
export default {
name:"NavBar"
}
</script>

<style>

.nav-bar{
    height: 44px;
    line-height: 44px;
    display: flex;
    box-shadow: 0 1px 1px rgba(100, 1000, 100, .1);
}
.left,.right{
    width: 60px;
  
}
.center{
    text-align: center;
    flex: 1;
   
}
</style>