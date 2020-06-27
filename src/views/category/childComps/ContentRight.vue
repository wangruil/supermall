<template>
  <div class="content-rig">
      <div v-for="(item,index) in msg" :key="index" class="imgdiv">
         <a :href="item.link">
             <img :src="item.image" alt="">
             <p>{{item.title}}</p>
         </a>
      </div>
  </div>
</template>

<script>
export default {
name:"ContentRight",
props:{
    msg:{
        type:Array,
        default(){
            return []
        }
    }
},
data() {
    return {
        
    }
},
mounted() {
    // this.$bus.$on('contentright',(c)=>{
    //     console.log(c);
    // })
},
}
</script>

<style scoped>
.content-rig{
    width: 100%;
    display: flex;
     padding-left: 20px; 
    
    flex-wrap: wrap;
}
.imgdiv{
width: 100px;
height: 100px;
font-size: 13px;
text-align: center;

}
img{
    border-radius: 50%;
    margin-bottom: 5px;
    z-index: 8;
    width: 70px;
   height: 70px;
}

</style>