import { getRoles } from './roles'

export const getWorkers = `w.id as worker_id, w.name as worker_name, w.shop_id, 
    ${getRoles}`

export const workersJoins = `inner join role rl
on w.role_id = rl.id`


export const workersQueryGet = `select
${getWorkers}
from worker w
${workersJoins}`