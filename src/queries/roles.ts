export const getRoles = `rl.id as role_id, rl.name as role_name`

export const rolesQueryGet = `select
${getRoles}
from role rl`

export const insertQuery = `insert into role (name) values 
(:name)`

export const getAddedItemQuery = rolesQueryGet + ` where rl.rowid = :lastRowid`

export const getByIdQuery = rolesQueryGet + ` where rl.id = :roleId`

export const deleteByIdQuery = `delete from role where id = :roleId`

export const paginationQuery = ` order by rl.id asc OFFSET :offset ROWS FETCH NEXT :maxnumrows ROWS ONLY`
