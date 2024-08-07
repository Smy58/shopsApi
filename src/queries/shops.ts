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

export const insertQuery = `insert into shop (name, address, work_time_start, work_time_end, waiting_time, image) values 
(:name, :address, :workTimeStart, :workTimeEnd, :waitingTime, :image)`

export const getAddedItemQuery = shopsQueryGet + ` where sh.rowid = :lastRowid`

export const getByIdQuery = shopsQueryGet + ` where sh.id = :shopId`

export const deleteByIdQuery = `delete from shop where id = :shopId`

export const paginationQuery = ` order by sh.id asc OFFSET :offset ROWS FETCH NEXT :maxnumrows ROWS ONLY`
