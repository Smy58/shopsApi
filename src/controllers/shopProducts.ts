import db_query from '../dbconnection';
import ShopProduct from '../models/shopProduct';
import { NotFoundError } from '../errors/not-found-err'

import { shopProductsQueryGet, insertQuery, getAddedItemQuery, getByIdQuery, deleteByIdQuery, paginationQuery } from '../queries/shopProducts'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllShopProduct = async function (req, res, next) {
    let query = shopProductsQueryGet;
    
    if (req.query.page) {
        offset = (req.query.page - 1) * maxnumrows
    }

    const params: {[k: string]: any} = { offset, maxnumrows };

    if (req.query.shopId) {
        query += ` where shop_id = :shopId`
        params.shopId = req.query.shopId
    }
    
    query += paginationQuery;
    
    const options = { prefetchRows: maxnumrows + 1, fetchArraySize: maxnumrows };
    
    const data = await db_query.exec(query, params, options);

    const result = data.rows.map(obj => {
        return ShopProduct(obj)
    })
    
    res.status(200).json(result);
};

module.exports.createShopProducts = async function (req, res, next) {
    const {
        shopId,
        productId,
        cost
    } = req.body;

    const query = insertQuery;
    
    const params = {
        shopId,
        productId,
        cost
    };
    
    const result = await db_query.exec(query, params, {});
    
    if (result?.lastRowid) {
        const newItemQuery = getAddedItemQuery
        const newItemData = await db_query.exec(newItemQuery, { lastRowid: result.lastRowid }, {});
        
        const newItemResult = ShopProduct(newItemData.rows[0])
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getShopProductById = async function (req, res, next) {
    const query = getByIdQuery;
    const params = { shopProductId: req.params.shopProductId};
    
    const data = await db_query.exec(query, params, {});

    
    if (data.rows.length == 0) {
        next(new NotFoundError('ShopProduct not found'))
    } else {
        const result = ShopProduct(data.rows[0])
        res.status(200).json(result);
    }
};

module.exports.delShopProductById = async function (req, res, next) {
    const query = deleteByIdQuery;
    const params = { shopProductId: req.params.shopProductId};
    
    
    const result = await db_query.exec(query, params, {});
    
    
    if (result.rowsAffected == 0) {

        next(new NotFoundError('ShopProduct not found'));

    } else {
        res.status(200).json({ message: `ShopProduct ${req.params.shopProductId} deleted` });
    }
};