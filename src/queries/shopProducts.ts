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

export const insertQuery = `insert into shop_product (shop_id, product_id, cost) values 
(:shopId, :productId, :cost)`

export const getAddedItemQuery = shopProductsQueryGet + ` where shpr.rowid = :lastRowid`

export const getByIdQuery = shopProductsQueryGet + ` where shpr.id = :shopProductId`

export const deleteByIdQuery = `delete from shop_product where id = :shopProductId`

export const paginationQuery = ` order by shpr.id asc OFFSET :offset ROWS FETCH NEXT :maxnumrows ROWS ONLY`
