import Role from "./role";

const Worker = (obj) => {
    return {
        "id": obj.WORKER_ID,
        "name": obj.WORKER_NAME,
        "shopId": obj.SHOP_ID,
        "role": Role(obj)
    }
}

export default Worker;