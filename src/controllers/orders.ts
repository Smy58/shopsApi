import db_query from '../dbconnection';
import orderPositionsDbService from '../services/oracleDB/orderPositions'
import ordersDbService from '../services/oracleDB/orders'


const maxnumrows = 20;
let offset = 0;


module.exports.getAllOrder = async function (req, res, next) {
    const params: {[k: string]: any} = { offset, maxnumrows };

    if (req.query.clientId || req.query.statusId) {
        if (req.query.clientId) {
            params.clientId = req.query.clientId
        }

        if (req.query.statusId) {
            params.statusId = req.query.statusId
        }
    }

    
    try {
        const con = await db_query.getCon()
        const result = await ordersDbService.getAll(con, params, req.query.page)
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
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

    const params = {
        totalCost,
        shopId,
        statusId,
        deliveryId,
        clientId
    };
    
    try {
        const con = await db_query.getCon()
        const result = await ordersDbService.createItem(con, params,positions);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
    
};


module.exports.getOrderById = async function (req, res, next) {
    const params = { orderId: req.params.orderId};
    
    try {
        const con = await db_query.getCon()
        const result = await ordersDbService.getById(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.delOrderById = async function (req, res, next) {
    
    const params = { orderId: req.params.orderId};
    try {
        const con = await db_query.getCon()
        const result = await ordersDbService.delById(con, params);
        res.status(200).json({ message: `Order ${req.params.orderId} deleted` });
    } catch (error){
        next(error);
    }
};

module.exports.getPositionsByOrderId = async function (req, res, next) {
    const params: {[k: string]: any} = { offset, maxnumrows };

    if (req.query.orderId) {
        params.orderId = req.query.orderId
    }
    
    try {
        const con = await db_query.getCon()
        const result = await orderPositionsDbService.getAll(con, params, req.query.page)
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};