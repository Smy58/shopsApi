import Shop from "./shop";
import Status from "./status";
import Delivery from "./delivery";
import Client from "./client";

const Order = (obj) => {
    return {
        "id": obj.ID,
        "totalCost": obj.TOTAL_COST,
        "shop": Shop(obj),
        "status": Status(obj),
        "delivery": Delivery(obj),
        "client": Client(obj)
    }
}

export default Order;