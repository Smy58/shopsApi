import { getRoles } from './roles'

export const getWorkers = `w.id as worker_id, w.name as worker_name, w.shop_id, 
    ${getRoles}`

export const workersJoins = `inner join role rl
on w.role_id = rl.id`


export const workersQueryGet = `select
${getWorkers}
from worker w
${workersJoins}`

export const insertQuery = `insert into worker (name, shop_id, role_id) values 
(:name, :shopId, :roleId)`

export const getAddedItemQuery = workersQueryGet + ` where w.rowid = :lastRowid`

export const getByIdQuery = workersQueryGet + ` where w.id = :workerId`

export const deleteByIdQuery = `delete from worker where id = :workerId`

export const paginationQuery = ` order by w.id asc OFFSET :offset ROWS FETCH NEXT :maxnumrows ROWS ONLY`
