import { NotFoundError } from "../../errors/not-found-err";
import Client from "../../models/client";
import { clientsQueryGet, deleteByIdQuery, getAddedItemQuery, getByIdQuery, insertQuery, paginationQuery } from "../../queries/clients";

import oracledb from 'oracledb'

const getAll = async function (con: oracledb.Connection, params: {[k: string]: any}, page: number) {
    let query = clientsQueryGet;
    
    query += paginationQuery;
    
    if (page) {
        params.offset = (page - 1) * params.maxnumrows
    }
    
    const options = { prefetchRows: params.maxnumrows + 1, fetchArraySize: params.maxnumrows };
    
    try {
        const data = await con.execute(query,params, options);
        const result = data.rows.map(obj => {
            return Client(obj)
        })

        return result
    } catch (error){
        throw (error);
    } 
}

const createItem = async function (con: oracledb.Connection, params: {[k: string]: any}) {
    const query = insertQuery;
    const newItemQuery = getAddedItemQuery
    
    try {
        const result = await con.execute(query, params, {});
        
        const newItemData = await con.execute(newItemQuery, { lastRowid: result.lastRowid }, {});

        const newItemResult = Client(newItemData.rows[0])
        
        return newItemResult
        

    } catch (error){
        throw(error);
    } 
}

const getById = async function (con: oracledb.Connection, params: {[k: string]: any}) {
    const query = getByIdQuery;
    
    try {
        const data = await con.execute(query, params, {});

        if (data.rows.length == 0) {
            throw(new NotFoundError('Client not found'))
        } else {
            const result = Client(data.rows[0])
            return result
        }
    } catch (error){
        throw(error);
    } 
}

const delById = async function (con: oracledb.Connection, params: {[k: string]: any}) {
    const query = deleteByIdQuery;
    
    try {
        const result = await con.execute(query, params, {});

        if (result.rowsAffected == 0) {
            throw(new NotFoundError('Client not found'));
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