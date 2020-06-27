export default {
    addCart(context, payload) {
     return new Promise((resolve,reject)=>{
        let oldproduct = null
        for (let item of context.state.cartList) {
            if (item.iid === payload.iid) {
                oldproduct = item
            }
        }
        //判断oldproduct是否有值
        if (oldproduct) {
            // oldproduct.count +=1
            context.commit("addCounter", oldproduct)
            resolve("当前商品数量+1")
        } else {
            payload.count = 1
            context.commit("addToCart", payload)
            resolve("添加了新得商品")
        }
     })
    }
}