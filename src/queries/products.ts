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