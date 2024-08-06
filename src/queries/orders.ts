import { getShops } from './shops'
import { getStatuses } from './statuses'
import { getDeliveries, deliveriesJoins } from './deliveries'
import { getClients } from './clients'


export const getOrders = `ord.id, ord.total_cost, 
    ${getShops},
    ${getStatuses},
    ${getDeliveries},
    ${getClients}`

export const ordersJoins = `inner join shop sh
    on ord.shop_id = sh.id
    inner join status st
    on ord.status_id = st.id
    inner join delivery dl
    on ord.delivery_id = dl.id
    ${deliveriesJoins}
    inner join client cl
    on ord.client_id = cl.id`

export const ordersQueryGet = `select
${getOrders}
from "order" ord
${ordersJoins}`