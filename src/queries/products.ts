import { getGroups } from './groups'

export const getProducts = `pr.id as product_id, 
    pr.name as product_name, 
    pr.description, pr.vendor_cost, 
    pr.image as product_image,
    ${getGroups}`

export const productsJoins = `inner join "group" gr
on pr.group_id = gr.id`

export const productsQueryGet = `select
${getProducts}
from product pr
${productsJoins}`

export const insertQuery = `insert into product (name, description, vendor_cost, image, group_id) values 
(:name, :description, :vendorCost, :image, :groupId)`

export const getAddedItemQuery = productsQueryGet + ` where pr.rowid = :lastRowid`

export const getByIdQuery = productsQueryGet + ` where pr.id = :productId`

export const deleteByIdQuery = `delete from product where id = :productId`

export const paginationQuery = ` order by pr.id asc OFFSET :offset ROWS FETCH NEXT :maxnumrows ROWS ONLY`
