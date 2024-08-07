import db_query from '../dbconnection';
import Product from '../models/product';
import { NotFoundError } from '../errors/not-found-err'

import { productsQueryGet, insertQuery, getAddedItemQuery, getByIdQuery, deleteByIdQuery, paginationQuery } from '../queries/products'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllProducts = async function (req, res, next) {
    let query = productsQueryGet;

    if (req.query.page) {
        offset = (req.query.page - 1) * maxnumrows
    }

    const params: {[k: string]: any} = { offset, maxnumrows };

    if (req.query.groupId) {
        query += ` where pr.group_id = :groupId`
        params.groupId = req.query.groupId
    }
    
    query += paginationQuery;
    
    const options = { prefetchRows: maxnumrows + 1, fetchArraySize: maxnumrows };
    
    const data = await db_query.exec(query, params, options);

    const result = data.rows.map(obj => {
        return Product(obj)
    })
    
    
    res.status(200).json(result);
};

module.exports.createProduct = async function (req, res, next) {
    const {
        name, 
        description, 
        vendorCost,
        image,
        groupId
    } = req.body;

    const query = insertQuery;
    
    const params = {
        name, 
        description, 
        vendorCost,
        image,
        groupId
    };
    
    const result = await db_query.exec(query, params, {});
    
    if (result?.lastRowid) {
        const newItemQuery = getAddedItemQuery
        const newItemData = await db_query.exec(newItemQuery, { lastRowid: result.lastRowid }, {});
        
        const newItemResult = Product(newItemData.rows[0])

        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getProductById = async function (req, res, next) {
    const query = getByIdQuery;
    const params = { productId: req.params.productId };
    
    const data = await db_query.exec(query, params, {});

    
    if (data.rows.length == 0) {
        next(new NotFoundError('Product not found'))
    } else {
        const result = Product(data.rows[0])
        res.status(200).json(result);
    }
};

module.exports.delProductById = async function (req, res, next) {
    const query = deleteByIdQuery;
    const params = { productId: req.params.productId };
    
    
    const result = await db_query.exec(query, params, {});
    
    
    if (result.rowsAffected == 0) {

        next(new NotFoundError('Product not found'));

    } else {
        res.status(200).json({ message: `Product ${req.params.productId} deleted` });
    }
};