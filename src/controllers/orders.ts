import dbconnection from '../dbconnection';
import db_query from '../dbconnection';
import Order from '../models/order';
import OrderPosition from '../models/orderPosition';
const oracledb = require('oracledb');

import { ordersQueryGet } from '../queries/orders'
import { orderPositionsQueryGet } from '../queries/orderPositions'


const getQuery = ordersQueryGet

const getOrdPosQuery = orderPositionsQueryGet

module.exports.getAllOrder = async function (req, res, next) {
    let query = getQuery;

    if (req.query.clientId || req.query.statusId) {
        query += ' where ';
        let and = '';
        if (req.query.clientId) {
            query += `ord.client_id = ${req.query.clientId}`;
            and = ' and ';
        }

        if (req.query.statusId) {
            query += and + `ord.shop_id = ${req.query.statusId}`;
        }
    }
    
    const params = [];
    
    const data = await db_query.exec(query,params);

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
    const query = `insert into "order" (total_cost, shop_id, status_id, delivery_id, client_id) values 
(${totalCost}, ${shopId}, ${statusId}, ${deliveryId}, ${clientId})`;
    
    console.log(query);
    
    const params = [];
    
    const result = await db_query.exec(query,params);
    
    if (result?.lastRowid) {
        const newItemQuery = getQuery + ` where ord.rowid = '${result.lastRowid}'`
        const newItemData = await db_query.exec(newItemQuery,[]);
        
        const newItemResult = newItemData.rows.map(obj => {
            return Order(obj)
        })

        answer.order = await newItemResult[0];

        let inp = []
        positions.forEach(async function (element) {
            inp.push({
                orderId: newItemResult[0].id,
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

        const addQuery = `INSERT INTO order_position (order_id, position_id, count) 
            VALUES (:orderId, :positionId, :count)`

        const ordPosResult = await dbconnection.execMany(addQuery, inp, options);

        const newOrdPosQuery = getOrdPosQuery + ` where ordpos.order_id = ${newItemResult[0].id}`;
        const newOrdPosData = await db_query.exec(newOrdPosQuery,[]);

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
    const query = getQuery + ` where ord.id = ${req.params.orderId}`;
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Order(obj)
    })
    
    res.status(200).json(result);
};

module.exports.delOrderById = async function (req, res, next) {
    const query = `delete from "order" where id = ${req.params.orderId}`;
    const params = [];
    
    
    const result = await db_query.exec(query,params);
    
    
    res.status(200).json({ message: "deleted" });
};

module.exports.getPositionsByOrderId = async function (req, res, next) {
    const query = getOrdPosQuery + ` where ordpos.order_id = ${req.params.orderId}`;
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return OrderPosition(obj)
    })
    
    
    res.status(200).json(result);
};