import { getByOrderIdQuery, insertOrdPosQuery } from "../../queries/orderPositions";
import { NotFoundError } from "../../errors/not-found-err";
import Order from "../../models/order";
import { ordersQueryGet, deleteByIdQuery, getAddedItemQuery, getByIdQuery, insertQuery, paginationQuery } from "../../queries/orders";
import OrderPosition from "../../models/orderPosition";
import oracledb from 'oracledb';


const getAll = async function (con: oracledb.Connection, params: {[k: string]: any}, page: number) {
    let query = ordersQueryGet;
    
    if (params.clientId || params.statusId) {
        query += ' where ';
        let and = '';
        if (params.clientId) {
            query += `ord.client_id = :clientId`;
            and = ' and ';
        }

        if (params.statusId) {
            query += and + `ord.status_id = :statusId`;
        }
    }

    query += paginationQuery;
    
    if (page) {
        params.offset = (page - 1) * params.maxnumrows
    }
    
    const options = { prefetchRows: params.maxnumrows + 1, fetchArraySize: params.maxnumrows };
    
    try {
        const data = await con.execute(query,params, options);
        const result = data.rows.map(obj => {
            return Order(obj)
        })

        return result
    } catch (error){
        throw (error);
    } 
}

const createItem = async function (con: oracledb.Connection, params: {[k: string]: any}, positions: [{positionId: number, count: number}]) {
    const answer = { order: {}, positions: [] }
    const query = insertQuery;
    const newItemQuery = getAddedItemQuery
    const addQuery = insertOrdPosQuery
    const newOrdPosQuery = getByOrderIdQuery;
    
    try {
        const result = await con.execute(query, params, {});
        
        const newItemData = await con.execute(newItemQuery, { lastRowid: result.lastRowid }, {});

        const newItemResult = Order(newItemData.rows[0])
        
        answer.order = newItemResult

        let inp = []
        positions.forEach(async function (element) {
            inp.push({
                orderId: newItemResult.id,
                positionId: element.positionId,
                count: element.count
            })
        });
        

        const options = {
            autoCommit: true,
            bindDefs: {
                orderId: { type: oracledb.NUMBER },
                positionId: { type: oracledb.NUMBER },
                count: { type: oracledb.NUMBER }
            }
        };

        const ordPosResult = await con.executeMany(addQuery, inp, options);

        const newOrdPosData = await con.execute(newOrdPosQuery, { orderId: newItemResult.id}, {});

        const newOrdPosResult = newOrdPosData.rows.map(obj => {
            return OrderPosition(obj)
        })

        answer.positions = await newOrdPosResult;

        return answer

    } catch (error){
        throw(error);
    } 
}

const getById = async function (con: oracledb.Connection, params: {[k: string]: any}) {
    const query = getByIdQuery;
    
    try {
        const data = await con.execute(query, params, {});

        if (data.rows.length == 0) {
            throw(new NotFoundError('order not found'))
        } else {
            const result = Order(data.rows[0])
            return result
        }
    } catch (error){
        throw(error);
    } 
}

const delById = async function (con: oracledb.Connection, params: {[k: string]: any}) {
    const query = deleteByIdQuery;
    
    try {
        console.log(query);
        console.log(params);
        
        
        const result = await con.execute(query, params, {});

        if (result.rowsAffected == 0) {
            throw(new NotFoundError('order not found'));
        } else {
            return result
        }
    } catch (error){
        throw(error);
    } 
}



export default {
    getAll,
    createItem,
    getById,
    delById
}