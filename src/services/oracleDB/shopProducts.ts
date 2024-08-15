import { NotFoundError } from "../../errors/not-found-err";
import ShopProduct from "../../models/shopProduct";
import { getPages, shopProductsQueryGet, deleteByIdQuery, getAddedItemQuery, getByIdQuery, insertQuery, paginationQuery } from "../../queries/shopProducts";
import oracledb from 'oracledb'
import { ShopProductsParams } from '../../types/params'


const getAll = async function (con: oracledb.Connection, params: ShopProductsParams.getAll, page: number) {
    let query = shopProductsQueryGet;
    let whereQ = ''
    if (params.shopId || params.groupId || params.searchInput) {
        whereQ += ` where`;
        let andQ = '';
        if (params.shopId) {
            whereQ += ` shop_id = :shopId`
            andQ = ' and'
        }
    
        if (params.groupId) {
            whereQ += andQ
            whereQ += ` group_id = :groupId`
            andQ = ' and'
        }
    
        if (params.searchInput) {
            whereQ += andQ
            whereQ += ` pr.name like :searchInput`
        }
    }
    
    query += whereQ
    query += paginationQuery;
    
    if (page) {
        params.offset = (page - 1) * params.maxnumrows
    }
    
    const options = { prefetchRows: params.maxnumrows + 1, fetchArraySize: params.maxnumrows };
    
    try {
        
        const data = await con.execute(query,params, options);
        const resultProducts = data.rows.map(obj => {
            return ShopProduct(obj)
        })

        query = getPages + '(' + shopProductsQueryGet + whereQ + ')'

        const newParams: Record<string, any> = {}
        if (params.shopId) {
            newParams.shopId = params.shopId
        }
        if (params.groupId) {
            newParams.groupId = params.groupId
        }
        if (params.searchInput) {
            newParams.searchInput = '%' + params.searchInput + '%'
        }
        
        
        const pagesData = await con.execute(query, newParams);
        const resultPages: Record<string, any> = pagesData.rows[0]

        const result = {
            products: resultProducts,
            pages: Math.ceil(resultPages.TOTAL_NUM_ROWS / params.maxnumrows)
        }
        

        return result
    } catch (error){
        throw (error);
    } 
}

const createItem = async function (con: oracledb.Connection, params: ShopProductsParams.create) {
    const query = insertQuery;
    const newItemQuery = getAddedItemQuery
    
    try {
        const result = await con.execute(query, params, {});

        const newItemData = await con.execute(newItemQuery, { lastRowid: result.lastRowid }, {});

        const newItemResult = ShopProduct(newItemData.rows[0])
        
        return newItemResult
    

    } catch (error){
        throw(error);
    } 
}

const getById = async function (con: oracledb.Connection, params: ShopProductsParams.getById) {
    const query = getByIdQuery;
    
    try {
        const data = await con.execute(query, params, {});

        if (data.rows.length == 0) {
            throw(new NotFoundError('shopProduct not found'))
        } else {
            const result = ShopProduct(data.rows[0])
            return result
        }
    } catch (error){
        throw(error);
    } 
}

const delById = async function (con: oracledb.Connection, params: ShopProductsParams.getById) {
    const query = deleteByIdQuery;
    
    try {
        const result = await con.execute(query, params, {});

        if (result.rowsAffected == 0) {
            throw(new NotFoundError('shopProduct not found'));
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