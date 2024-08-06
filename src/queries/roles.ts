export const getRoles = `rl.id as role_id, rl.name as role_name`

export const rolesQueryGet = `select
${getRoles}
from role rl`