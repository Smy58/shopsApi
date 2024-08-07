import { getWorkers, workersJoins } from './workers'

export const getMails = `m.id, m.mail, 
    ${getWorkers}`

export const mailJoins = `inner join worker w
on m.worker_id = w.id
${workersJoins}`

export const mailsQueryGet = `select
${getMails}
from mail m
${mailJoins}`

export const insertQuery = `insert into mail (mail, worker_id) values 
(:mail, :workerId)`

export const getAddedItemQuery = mailsQueryGet + ` where m.rowid = :lastRowid`

export const getByIdQuery = mailsQueryGet + ` where m.id = :mailId`

export const deleteByIdQuery = `delete from mail where id = :mailId`

export const paginationQuery = ` order by m.id asc OFFSET :offset ROWS FETCH NEXT :maxnumrows ROWS ONLY`
