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