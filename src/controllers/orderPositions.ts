import db_query from '../dbconnection';
import orderPositionsDbService from '../services/oracleDB/orderPositions'
import { NotFoundError } from '../errors/not-found-err'
import { OrederPositionsParams } from '../types/params'
import OracleDB from 'oracledb';

const maxnumrows = 20;
let offset = 0;

module.exports.getAllOrderPosition = async function (req, res, next) {
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


module.exports.getOrderPositionById = async function (req, res, next) {
    const params: OrederPositionsParams.getById = { orderPositionId: req.params.orderPositionId};
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await orderPositionsDbService.getById(con, params);
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

module.exports.delOrderPositionById = async function (req, res, next) {
    const params: OrederPositionsParams.getById = { orderPositionId: req.params.orderPositionId};
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await orderPositionsDbService.delById(con, params);
        res.status(200).json({ message: `OrderPosition ${req.params.orderPositionId} deleted` });
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


module.exports.getNothing = async function (req, res, next) {
    const e = new NotFoundError('Not Found');
    next(e);
}