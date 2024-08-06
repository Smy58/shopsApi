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