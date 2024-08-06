const Shop = (obj) => {
    return {
        "id": obj.SHOP_ID,
        "name": obj.SHOP_NAME,
        "address": obj.SHOP_ADDRESS,
        "workTimeStart": obj.WORK_TIME_START,
        "workTimeEnd": obj.WORK_TIME_END,
        "waitingTime": obj.WAITING_TIME,
        "image": obj.SHOP_IMAGE
    }
}

export default Shop;