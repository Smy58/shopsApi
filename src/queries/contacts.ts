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