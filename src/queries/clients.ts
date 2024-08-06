export const getClients = `cl.id as client_id, 
    cl.name as client_name, 
    cl.address as client_address, 
    cl.phone as client_phone, 
    cl.mail as client_mail`

export const clientsQueryGet = `select
    ${getClients}
from client cl`