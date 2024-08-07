import db_query from '../dbconnection';
import Shop from '../models/shop';

import { NotFoundError } from '../errors/not-found-err'

import { shopsQueryGet, insertQuery, getAddedItemQuery, getByIdQuery, deleteByIdQuery, paginationQuery } from '../queries/shops'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllShops = async function (req, res, next) {
    let query = shopsQueryGet;
    
    query += paginationQuery;
    
    if (req.query.page) {
        offset = (req.query.page - 1) * maxnumrows
    }
    
    const params = { offset, maxnumrows };
    const options = { prefetchRows: maxnumrows + 1, fetchArraySize: maxnumrows };

    
    const data = await db_query.exec(query, params, options);

    const result = data.rows.map(obj => {
        return Shop(obj)
    })
    
    res.status(200).json(result);
};

module.exports.createShop = async function (req, res, next) {
    const {
        name, 
        address, 
        workTimeStart,
        workTimeEnd,
        waitingTime,
        image
    } = req.body;

    const query = insertQuery;
    
    const params = {
        name, 
        address, 
        workTimeStart,
        workTimeEnd,
        waitingTime,
        image
    };
    
    const result = await db_query.exec(query, params, {});
    
    if (result?.lastRowid) {
        const newItemQuery = getAddedItemQuery
        const newItemData = await db_query.exec(newItemQuery, { lastRowid: result.lastRowid }, {});
        const newItemResult = Shop(newItemData.rows[0])
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getShopById = async function (req, res, next) {
    const query = getByIdQuery;
    const params = { shopId: req.params.shopId};
    
    const data = await db_query.exec(query, params, {});
    


    if (data.rows.length == 0) {
        next(new NotFoundError('Shop not found'))
    } else {
        const result = Shop(data.rows[0])
        res.status(200).json(result);
    }
    
    
};

module.exports.delShopById = async function (req, res, next) {
    const query = deleteByIdQuery;
    const params = { shopId: req.params.shopId};
    
    
    const result = await db_query.exec(query, params, {});

    
    if (result.rowsAffected == 0) {

        next(new NotFoundError('Shop not found'));

    } else {
        res.status(200).json({ message: `Shop ${req.params.shopId} deleted` });
    }
    
};