import db_query from '../dbconnection';
import Delivery from '../models/delivery';
import { NotFoundError } from '../errors/not-found-err'

import { deliveriesQueryGet, insertQuery, getAddedItemQuery, getByIdQuery, deleteByIdQuery, paginationQuery } from '../queries/deliveries'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllDelivery = async function (req, res, next) {
    let query = deliveriesQueryGet;
    
    query += paginationQuery;
    
    if (req.query.page) {
        offset = (req.query.page - 1) * maxnumrows
    }
    
    const params = { offset, maxnumrows };
    const options = { prefetchRows: maxnumrows + 1, fetchArraySize: maxnumrows };
    
    const data = await db_query.exec(query, params, options);

    const result = data.rows.map(obj => {
        return Delivery(obj)
    })
    
    res.status(200).json(result);
};

module.exports.createDelivery = async function (req, res, next) {
    const {
        workerId
    } = req.body;

    const query = insertQuery;
    
    const params = {
        workerId
    };
    
    
    const result = await db_query.exec(query, params, {});

    if (result?.lastRowid) {
        const newItemQuery = getAddedItemQuery
        const newItemData = await db_query.exec(newItemQuery, { lastRowid: result.lastRowid }, {});

        const newItemResult = Delivery(newItemData.rows[0]);
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getDeliveryById = async function (req, res, next) {
    const query = getByIdQuery;
    const params = { deliveryId: req.params.deliveryId };
    
    const data = await db_query.exec(query, params, {});

    
    if (data.rows.length == 0) {
        next(new NotFoundError('Contact not found'))
    } else {
        const result = Delivery(data.rows[0])
        res.status(200).json(result);
    }
};

module.exports.delDeliveryById = async function (req, res, next) {
    const query = deleteByIdQuery;
    const params = { deliveryId: req.params.deliveryId };
    
    
    const result = await db_query.exec(query, params, {});
    
    
    if (result.rowsAffected == 0) {

        next(new NotFoundError('Contact not found'));

    } else {
        res.status(200).json({ message: `Contact ${req.params.deliveryId} deleted` });
    }
};