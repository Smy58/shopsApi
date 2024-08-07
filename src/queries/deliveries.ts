import { getWorkers, workersJoins } from './workers'

export const getDeliveries = `dl.id as delivery_id, 
    ${getWorkers}`

export const deliveriesJoins = `inner join worker w
on dl.worker_id = w.id
${workersJoins}`

export const deliveriesQueryGet = `select
${getDeliveries}
from delivery dl
${deliveriesJoins}`

export const insertQuery = `insert into delivery (worker_id) values 
(:workerId)`

export const getAddedItemQuery = deliveriesQueryGet + ` where dl.rowid = :lastRowid`

export const getByIdQuery = deliveriesQueryGet + ` where dl.id = :deliveryId`

export const deleteByIdQuery = `delete from delivery where id = :deliveryId`

export const paginationQuery = ` order by dl.id asc OFFSET :offset ROWS FETCH NEXT :maxnumrows ROWS ONLY`
