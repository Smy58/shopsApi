export const getGroups = `gr.id as group_id, 
    gr.name as group_name`

export const groupsQueryGet = `select
${getGroups}
from "group" gr`