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

export const insertOrdPosQuery = `INSERT INTO order_position (order_id, position_id, count) 
            VALUES (:orderId, :positionId, :count)`

export const getByOrderIdQuery = orderPositionsQueryGet + ` where ordpos.order_id = :orderId`

export const getByIdQuery = orderPositionsQueryGet + ` where ordpos.id = :orderPositionId`

export const deleteByIdQuery = `delete from order_position where id = :orderPositionId`

export const paginationQuery = ` order by ordpos.id asc OFFSET :offset ROWS FETCH NEXT :maxnumrows ROWS ONLY`
