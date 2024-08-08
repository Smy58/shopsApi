import { NotFoundError } from "../../errors/not-found-err";
import ShopProduct from "../../models/shopProduct";
import { shopProductsQueryGet, deleteByIdQuery, getAddedItemQuery, getByIdQuery, insertQuery, paginationQuery } from "../../queries/shopProducts";


const getAll = async function (con, params, page) {
    let query = shopProductsQueryGet;
    
    if (params.shopId) {
        query += ` where shop_id = :shopId`
    }

    query += paginationQuery;
    
    if (page) {
        params.offset = (page - 1) * params.maxnumrows
    }
    
    const options = { prefetchRows: params.maxnumrows + 1, fetchArraySize: params.maxnumrows };
    
    try {
        const data = await con.execute(query,params, options);
        const result = data.rows.map(obj => {
            return ShopProduct(obj)
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

const createItem = async function (con, params) {
    const query = insertQuery;
    
    try {
        const result = await con.execute(query, params, {});
        
        const newItemQuery = getAddedItemQuery

        try {
            const newItemData = await con.execute(newItemQuery, { lastRowid: result.lastRowid }, {});

            const newItemResult = ShopProduct(newItemData.rows[0])
            
            return newItemResult
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
            throw(new NotFoundError('shopProduct not found'))
        } else {
            const result = ShopProduct(data.rows[0])
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
            throw(new NotFoundError('shopProduct not found'));
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