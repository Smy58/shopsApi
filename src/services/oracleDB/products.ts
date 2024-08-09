import { NotFoundError } from "../../errors/not-found-err";
import Product from "../../models/product";
import { productsQueryGet, deleteByIdQuery, getAddedItemQuery, getByIdQuery, insertQuery, paginationQuery } from "../../queries/products";
import oracledb from 'oracledb'
import { ProductsParams } from '../../types/params'


const getAll = async function (con: oracledb.Connection, params: ProductsParams.getAll, page: number) {
    let query = productsQueryGet;
    
    if (params.groupId) {
        query += ` where pr.group_id = :groupId`
    }

    query += paginationQuery;
    
    if (page) {
        params.offset = (page - 1) * params.maxnumrows
    }
    
    const options = { prefetchRows: params.maxnumrows + 1, fetchArraySize: params.maxnumrows };
    
    try {
        const data = await con.execute(query,params, options);
        const result = data.rows.map(obj => {
            return Product(obj)
        })

        return result
    } catch (error){
        throw (error);
    } 
}

const createItem = async function (con: oracledb.Connection, params: ProductsParams.create) {
    const query = insertQuery;
    const newItemQuery = getAddedItemQuery
    
    try {
        const result = await con.execute(query, params, {});
        
        const newItemData = await con.execute(newItemQuery, { lastRowid: result.lastRowid }, {});

        const newItemResult = Product(newItemData.rows[0])
        
        return newItemResult
    

    } catch (error){
        throw(error);
    } 
}

const getById = async function (con: oracledb.Connection, params: ProductsParams.getById) {
    const query = getByIdQuery;
    
    try {
        const data = await con.execute(query, params, {});

        if (data.rows.length == 0) {
            throw(new NotFoundError('product not found'))
        } else {
            const result = Product(data.rows[0])
            return result
        }
    } catch (error){
        throw(error);
    } 
}

const delById = async function (con: oracledb.Connection, params: ProductsParams.getById) {
    const query = deleteByIdQuery;
    
    try {
        const result = await con.execute(query, params, {});

        if (result.rowsAffected == 0) {
            throw(new NotFoundError('product not found'));
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