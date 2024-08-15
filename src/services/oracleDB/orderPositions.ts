import { NotFoundError } from "../../errors/not-found-err";
import OrderPosition from "../../models/orderPosition";
import { orderPositionsQueryGet, deleteByIdQuery, getByIdQuery, paginationQuery } from "../../queries/orderPositions";
import oracledb from 'oracledb'
import { OrederPositionsParams } from '../../types/params'


const getAll = async function (con: oracledb.Connection, params: OrederPositionsParams.getAll, page: number) {
    let query = orderPositionsQueryGet;
    
    if (params.orderId) {
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
    } 
}

const getById = async function (con: oracledb.Connection, params: OrederPositionsParams.getById) {
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
    } 
}

const delById = async function (con: oracledb.Connection, params: OrederPositionsParams.getById) {
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
    } 
}


export default {
    getAll,
    getById,
    delById
}