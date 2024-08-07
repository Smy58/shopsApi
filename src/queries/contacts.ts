import { getWorkers, workersJoins } from './workers'

export const getContacts = `c.id, c.phone, 
    ${getWorkers}`

export const contactsJoins = `inner join worker w
on c.worker_id = w.id
${workersJoins}`

export const contactsQueryGet = `select
${getContacts}
from contact c
${contactsJoins}`

export const insertQuery = `insert into contact (phone, worker_id) values 
(:phone, :workerId)`

export const getAddedItemQuery = contactsQueryGet + ` where c.rowid = :lastRowid`

export const getByIdQuery = contactsQueryGet + ` where c.id = :contactId`

export const deleteByIdQuery = `delete from contact where id = :contactId`

export const paginationQuery = ` order by c.id asc OFFSET :offset ROWS FETCH NEXT :maxnumrows ROWS ONLY`
