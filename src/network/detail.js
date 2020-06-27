import { request } from "./request";

//详情轮播
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

//商品标题价格等文字
export class Goods {
    constructor(itemInfo, columns, services) {
      this.title = itemInfo.title
      this.desc = itemInfo.desc
      this.newPrice = itemInfo.price
      this.oldPrice = itemInfo.oldPrice
      this.discount = itemInfo.discountDesc
      this.columns = columns
      this.services = services
      this.realPrice = itemInfo.lowNowPrice
    }
  }


//店铺logo及信息
  export class Shop {
    constructor(shopInfo) {
      this.logo = shopInfo.shopLogo;
      this.name = shopInfo.name;
      this.fans = shopInfo.cFans;
      this.sells = shopInfo.cSells;
      this.score = shopInfo.score;
      this.goodsCount = shopInfo.cGoods
    }
  }
  

  export class GoodsParam {
    constructor(info, rule) {
      // 注: images可能没有值(某些商品有值, 某些没有值)
      this.image = info.images ? info.images[0] : '';
      this.infos = info.set;
      this.sizes = rule.tables;
    }
  }
  

  //推荐数据的展示
  export function getRecommend(){
    return request({
      url:'/recommend'
    })
  }
  
  