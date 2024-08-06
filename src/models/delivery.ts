import Worker from "./worker";

const Delivery = (obj) => {
    return {
        "id": obj.DELIVERY_ID,
        "worker": Worker(obj)
    }
}

export default Delivery;