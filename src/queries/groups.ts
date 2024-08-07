export const getGroups = `gr.id as group_id, 
    gr.name as group_name`

export const groupsQueryGet = `select
${getGroups}
from "group" gr`

export const insertQuery = `insert into "group" (name) values 
(:name)`

export const getAddedItemQuery = groupsQueryGet + ` where rowid = :lastRowid`

export const getByIdQuery = groupsQueryGet + ` where id = :groupId`;

export const deleteByIdQuery = `delete from "group" where id = :groupId`

export const paginationQuery = ` order by gr.id asc OFFSET :offset ROWS FETCH NEXT :maxnumrows ROWS ONLY`
