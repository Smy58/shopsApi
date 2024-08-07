import dbconnection from '../dbconnection';
import db_query from '../dbconnection';
import Order from '../models/order';
import OrderPosition from '../models/orderPosition';
const oracledb = require('oracledb');
import { NotFoundError } from '../errors/not-found-err'

import { ordersQueryGet, insertQuery, getAddedItemQuery, getByIdQuery, deleteByIdQuery, paginationQuery } from '../queries/orders'
import { insertOrdPosQuery, getByOrderIdQuery } from '../queries/orderPositions'

const maxnumrows = 20;
let offset = 0;


module.exports.getAllOrder = async function (req, res, next) {
    let query = ordersQueryGet;

    if (req.query.page) {
        offset = (req.query.page - 1) * maxnumrows
    }

    const params: {[k: string]: any} = { offset, maxnumrows };

    if (req.query.clientId || req.query.statusId) {
        query += ' where ';
        let and = '';
        if (req.query.clientId) {
            query += `ord.client_id = :clientId`;
            and = ' and ';
            params.clientId = req.query.clientId
        }

        if (req.query.statusId) {
            query += and + `ord.status_id = :statusId`;
            params.statusId = req.query.statusId
        }
    }

    
    
    query += paginationQuery;
    
    const options = { prefetchRows: maxnumrows + 1, fetchArraySize: maxnumrows };
    
    const data = await db_query.exec(query, params, options);


    const result = data.rows.map(obj => {
        return Order(obj)
    })
    
    
    res.status(200).json(result);
};

module.exports.createOrder = async function (req, res, next) {
    const {
        totalCost,
        shopId,
        statusId,
        deliveryId,
        clientId,
        positions
    } = req.body;

    const answer = { order: {}, positions: [] }
    const query = insertQuery;
    
    console.log(query);
    
    const params = {
        totalCost,
        shopId,
        statusId,
        deliveryId,
        clientId
    };
    
    const result = await db_query.exec(query, params, {});
    
    if (result?.lastRowid) {
        const newItemQuery = getAddedItemQuery
        const newItemData = await db_query.exec(newItemQuery, { lastRowid: result.lastRowid }, {});
        
        const newItemResult = Order(newItemData.rows[0])

        answer.order = newItemResult;

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

        const ordPosResult = await dbconnection.execMany(addQuery, inp, options);

        const newOrdPosQuery = getByOrderIdQuery;
        const newOrdPosData = await db_query.exec(newOrdPosQuery, { orderId: newItemResult.id}, {});

        const newOrdPosResult = newOrdPosData.rows.map(obj => {
            return OrderPosition(obj)
        })

        answer.positions = await newOrdPosResult;

        res.status(200).json(answer);
    } else {
        res.status(501).json({});
    }
    

    
};


module.exports.getOrderById = async function (req, res, next) {
    const query = getByIdQuery;
    const params = { orderId: req.params.orderId};
    
    const data = await db_query.exec(query, params, {});

    
    
    if (data.rows.length == 0) {
        next(new NotFoundError('Order not found'))
    } else {
        const result = Order(data.rows[0])
        res.status(200).json(result);
    }
};

module.exports.delOrderById = async function (req, res, next) {
    const query = deleteByIdQuery;
    const params = { orderId: req.params.orderId};
    const result = await db_query.exec(query, params, {});
    
    
    if (result.rowsAffected == 0) {

        next(new NotFoundError('Order not found'));

    } else {
        res.status(200).json({ message: `Order ${req.params.orderId} deleted` });
    }
};

module.exports.getPositionsByOrderId = async function (req, res, next) {
    const query = getByOrderIdQuery;
    const params = { orderId: req.params.orderId};
    
    const data = await db_query.exec(query, params, {});

    const result = data.rows.map(obj => {
        return OrderPosition(obj)
    })
    
    
    if (result.length == 0) {
        next(new NotFoundError('Shop not found'))
    } else {
        res.status(200).json(result);
    }
};