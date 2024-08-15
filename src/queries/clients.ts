export const getClients = `cl.id as client_id, 
    cl.name as client_name, 
    cl.address as client_address, 
    cl.phone as client_phone, 
    cl.mail as client_mail`

export const paginationQuery = ` order by cl.id asc OFFSET :offset ROWS FETCH NEXT :maxnumrows ROWS ONLY`

export const clientsQueryGet = `select
    ${getClients}
from client cl`

export const clientLoginQueryGet = `select
    ${getClients},
    cl.password as password
from client cl`

export const updateQuery = `UPDATE client
SET 
    name = :name,
    address = :address,
    phone = :phone,
    mail = :mail,
    update_client = sysdate
where id = :clientId`

export const updatePasswordQuery = `UPDATE client
SET 
    password = :newPassword,
    update_client = sysdate
where id = :clientId`

export const insertQuery = `insert into client (name, address, phone, mail, password) values 
(:name, :address, :phone, :mail, :password)`

export const getAddedItemQuery = clientsQueryGet + ` where cl.rowid = :lastRowid`

export const getByIdQuery = clientsQueryGet + ` where cl.id = :clientId`
export const getPassByIdQuery = clientLoginQueryGet + ` where cl.id = :clientId`

export const deleteByIdQuery = `delete from client where id = :clientId`

