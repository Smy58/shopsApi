import OracleDB from 'oracledb';
import db_query from '../dbconnection';
import shopsDbService from '../services/oracleDB/shops'
import { ShopsParams } from '../types/params'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllShops = async function (req, res, next) {
    const params: ShopsParams.getAll = { offset, maxnumrows };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await shopsDbService.getAll(con, params, req.query.page)
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

module.exports.createShop = async function (req, res, next) {
    const {
        name, 
        address, 
        workTimeStart,
        workTimeEnd,
        waitingTime,
        image
    } = req.body;

    const params: ShopsParams.create = {
        name, 
        address, 
        workTimeStart,
        workTimeEnd,
        waitingTime,
        image
    };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await shopsDbService.createItem(con, params);
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


module.exports.getShopById = async function (req, res, next) {
    const params: ShopsParams.getById = { shopId: req.params.shopId};
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await shopsDbService.getById(con, params);
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

module.exports.delShopById = async function (req, res, next) {
    const params: ShopsParams.getById = { shopId: req.params.shopId};
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await shopsDbService.delById(con, params);
        res.status(200).json({ message: `Shop ${req.params.shopId} deleted` });
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