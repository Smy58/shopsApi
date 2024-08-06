import { getProducts, productsJoins } from './products'

export const getShopProducts = `shpr.id as position_id, shpr.shop_id, shpr.cost, 
    ${getProducts}`

export const shopProductsJoins = `inner join product pr
on shpr.product_id = pr.id
${productsJoins}`

export const shopProductsQueryGet = `select
${getShopProducts}
from shop_product shpr
${shopProductsJoins}`