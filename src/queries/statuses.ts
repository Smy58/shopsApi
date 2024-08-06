export const getStatuses = `st.id as status_id, 
    st.name as status_name`

export const statusesQueryGet = `select
${getStatuses}
from status st`