import ShopProduct from "./shopProduct";

const OrderPosition = (obj) => {
    return {
        "id": obj.ORDER_POSITION_ID,
        "orderId": obj.ORDER_ID,
        "count": obj.COUNT,
        "position": ShopProduct(obj)
    }
}

export default OrderPosition;