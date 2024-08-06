import db_query from '../dbconnection';
import OrderPosition from '../models/orderPosition';

import { orderPositionsQueryGet } from '../queries/orderPositions'

const getQuery = orderPositionsQueryGet;

module.exports.getAllOrderPosition = async function (req, res, next) {
    let query = getQuery;

    if (req.query.orderId) {
        query += ` where order_id = ${req.query.orderId}`
    }
    
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return OrderPosition(obj)
    })
    
    res.status(200).json(result);
};


module.exports.getOrderPositionById = async function (req, res, next) {
    const query = getQuery + ` where ordpos.id = ${req.params.orderPositionId}`;
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return OrderPosition(obj)
    })
    
    res.status(200).json(result);
};

module.exports.delOrderPositionById = async function (req, res, next) {
    const query = `delete from order_position where id = ${req.params.orderPositionId}`;
    const params = [];
    
    
    const result = await db_query.exec(query,params);
    
    
    res.status(200).json({ message: "deleted" });
};