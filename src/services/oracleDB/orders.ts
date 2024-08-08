import { getByOrderIdQuery, insertOrdPosQuery } from "../../queries/orderPositions";
import { NotFoundError } from "../../errors/not-found-err";
import Order from "../../models/order";
import { ordersQueryGet, deleteByIdQuery, getAddedItemQuery, getByIdQuery, insertQuery, paginationQuery } from "../../queries/orders";
import OrderPosition from "../../models/orderPosition";
import oracledb from 'oracledb';


const getAll = async function (con, params, page) {
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

const createItem = async function (con, params, positions) {
    const answer = { order: {}, positions: [] }
    const query = insertQuery;
    
    try {
        const result = await con.execute(query, params, {});
        
        const newItemQuery = getAddedItemQuery
        

        try {
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

            const addQuery = insertOrdPosQuery

            const ordPosResult = await con.executeMany(addQuery, inp, options);

            const newOrdPosQuery = getByOrderIdQuery;
            const newOrdPosData = await con.execute(newOrdPosQuery, { orderId: newItemResult.id}, {});

            const newOrdPosResult = newOrdPosData.rows.map(obj => {
                return OrderPosition(obj)
            })

            answer.positions = await newOrdPosResult;

            return answer
        } catch (err){
            throw(err);
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

const getById = async function (con, params) {
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
    createItem,
    getById,
    delById
}