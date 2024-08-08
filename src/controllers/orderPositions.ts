import db_query from '../dbconnection';
import orderPositionsDbService from '../services/oracleDB/orderPositions'
import { NotFoundError } from '../errors/not-found-err'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllOrderPosition = async function (req, res, next) {
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


module.exports.getOrderPositionById = async function (req, res, next) {
    const params = { orderPositionId: req.params.orderPositionId};
    
    try {
        const con = await db_query.getCon()
        const result = await orderPositionsDbService.getById(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.delOrderPositionById = async function (req, res, next) {
    const params = { orderPositionId: req.params.orderPositionId};
    
    try {
        const con = await db_query.getCon()
        const result = await orderPositionsDbService.delById(con, params);
        res.status(200).json({ message: `OrderPosition ${req.params.orderPositionId} deleted` });
    } catch (error){
        next(error);
    }
};


module.exports.getNothing = async function (req, res, next) {
    const e = new NotFoundError('Not Found');
    next(e);
}