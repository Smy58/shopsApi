export const getShops = `sh.id as shop_id,
    sh.name as shop_name, 
    sh.address as shop_address,
    sh.work_time_start,
    sh.work_time_end,
    sh.waiting_time,
    sh.image as shop_image`

export const shopsQueryGet = `select
${getShops}
from shop sh`