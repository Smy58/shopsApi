import { NotFoundError } from "../../errors/not-found-err";
import OrderPosition from "../../models/orderPosition";
import { orderPositionsQueryGet, deleteByIdQuery, getByIdQuery, paginationQuery } from "../../queries/orderPositions";

const getAll = async function (con, params, page) {
    let query = orderPositionsQueryGet;
    
    if (params.workerId) {
        query += ` where order_id = :orderId`

    }

    query += paginationQuery;
    
    if (page) {
        params.offset = (page - 1) * params.maxnumrows
    }
    
    const options = { prefetchRows: params.maxnumrows + 1, fetchArraySize: params.maxnumrows };
    
    try {
        const data = await con.execute(query,params, options);
        const result = data.rows.map(obj => {
            return OrderPosition(obj)
        })

        return result
    } catch (error){
        throw (error);
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                throw (err);
            }
        }
    }
}

const getById = async function (con, params) {
    const query = getByIdQuery;
    
    try {
        const data = await con.execute(query, params, {});

        if (data.rows.length == 0) {
            throw(new NotFoundError('orderPosition not found'))
        } else {
            const result = OrderPosition(data.rows[0])
            return result
        }
    } catch (error){
        throw(error);
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                throw(err);
            }
        }
    }
}

const delById = async function (con, params) {
    const query = deleteByIdQuery;
    
    try {
        const result = await con.execute(query, params, {});

        if (result.rowsAffected == 0) {
            throw(new NotFoundError('orderPosition not found'));
        } else {
            return result
        }
    } catch (error){
        throw(error);
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                throw(err);
            }
        }
    }
}


export default {
    getAll,
    getById,
    delById
}