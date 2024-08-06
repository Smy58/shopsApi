import Group from "./group";

const Product = (obj) => {
    return {
        "id": obj.PRODUCT_ID,
        "name": obj.PRODUCT_NAME,
        "description": obj.DESCRIPTION,
        "vendorCost": obj.VENDOR_COST,
        "image": obj.PRODUCT_IMAGE,
        "group": Group(obj)
    }
};

export default Product;