export const getStatuses = `st.id as status_id, 
    st.name as status_name`

export const statusesQueryGet = `select
${getStatuses}
from status st`

export const insertQuery = `insert into status (name) values 
(:name)`

export const getAddedItemQuery = statusesQueryGet + ` where st.rowid = :lastRowid`

export const getByIdQuery = statusesQueryGet + ` where st.id = :statusId`

export const deleteByIdQuery = `delete from status where id = :statusId`

export const paginationQuery = ` order by st.id asc OFFSET :offset ROWS FETCH NEXT :maxnumrows ROWS ONLY`
