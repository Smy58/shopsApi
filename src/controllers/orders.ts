import OracleDB from 'oracledb';
import db_query from '../dbconnection';
import orderPositionsDbService from '../services/oracleDB/orderPositions'
import ordersDbService from '../services/oracleDB/orders'
import { OrdersParams, OrederPositionsParams } from '../types/params'

const maxnumrows = 20;
let offset = 0;


module.exports.getAllOrder = async function (req, res, next) {
    const params: OrdersParams.getAll = { offset, maxnumrows };

    if (req.query.clientId || req.query.statusId) {
        if (req.query.clientId) {
            params.clientId = req.query.clientId
        }

        if (req.query.statusId) {
            params.statusId = req.query.statusId
        }
    }

    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await ordersDbService.getAll(con, params, req.query.page)
        res.status(200).json(result);
    } catch (error){
        next(error);
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                throw(err);
            }
        }
    }
};

module.exports.createOrder = async function (req, res, next) {
    const {
        totalCost,
        shopId,
        statusId,
        deliveryId,
        clientId
    } = req.body;

    const positions: OrederPositionsParams.create[] = req.body.positions

    const params: OrdersParams.create = {
        totalCost,
        shopId,
        statusId,
        deliveryId,
        clientId
    };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await ordersDbService.createItem(con, params, positions);
        res.status(200).json(result);
    } catch (error){
        next(error);
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                throw(err);
            }
        }
    }
    
};


module.exports.getOrderById = async function (req, res, next) {
    const params: OrdersParams.getById = { orderId: req.params.orderId};
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await ordersDbService.getById(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                throw(err);
            }
        }
    }
};

module.exports.delOrderById = async function (req, res, next) {
    
    const params: OrdersParams.getById = { orderId: req.params.orderId};
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await ordersDbService.delById(con, params);
        res.status(200).json({ message: `Order ${req.params.orderId} deleted` });
    } catch (error){
        next(error);
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                throw(err);
            }
        }
    }
};

module.exports.getPositionsByOrderId = async function (req, res, next) {
    const params: OrederPositionsParams.getAll = { offset, maxnumrows };

    if (req.query.orderId) {
        params.orderId = req.query.orderId
    }
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await orderPositionsDbService.getAll(con, params, req.query.page)
        res.status(200).json(result);
    } catch (error){
        next(error);
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                throw(err);
            }
        }
    }
};