import { getShopProducts, shopProductsJoins } from './shopProducts'

export const getOrderPositions = `ordpos.id as order_position_id, 
    ordpos.order_id, ordpos.count,
    ${getShopProducts}`

export const orderPositionsJoins = `inner join shop_product shpr
on ordpos.position_id = shpr.id
${shopProductsJoins}`

export const orderPositionsQueryGet = `select
${getOrderPositions}
from order_position ordpos
${orderPositionsJoins}`