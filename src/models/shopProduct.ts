import Product from "./product";

const ShopProduct = (obj) => {
    return {
        "id": obj.POSITION_ID,
        "shopId": obj.SHOP_ID,
        "cost": obj.COST,
        "product": Product(obj)
    }
}

export default ShopProduct;