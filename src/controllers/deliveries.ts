import OracleDB from 'oracledb';
import db_query from '../dbconnection';
import deliveriesDbService from '../services/oracleDB/deliveries'
import { DeliveriesParams } from '../types/params'
const maxnumrows = 20;
let offset = 0;

module.exports.getAllDelivery = async function (req, res, next) {
    const params: DeliveriesParams.getAll = { offset, maxnumrows };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await deliveriesDbService.getAll(con, params, req.query.page)
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

module.exports.createDelivery = async function (req, res, next) {
    const {
        workerId
    } = req.body;

    const params: DeliveriesParams.create = {
        workerId
    };
    
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await deliveriesDbService.createItem(con, params);
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


module.exports.getDeliveryById = async function (req, res, next) {
    const params: DeliveriesParams.getById = { deliveryId: req.params.deliveryId };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await deliveriesDbService.getById(con, params);
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

module.exports.delDeliveryById = async function (req, res, next) {
    const params: DeliveriesParams.getById = { deliveryId: req.params.deliveryId };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await deliveriesDbService.delById(con, params);
        res.status(200).json({ message: `Delivery ${req.params.deliveryId} deleted` });
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