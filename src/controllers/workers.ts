import OracleDB from 'oracledb';
import db_query from '../dbconnection';
import workersDbService from '../services/oracleDB/workers'
import { WorkersParams } from '../types/params'
const maxnumrows = 20;
let offset = 0;

module.exports.getAllWorker = async function (req, res, next) {
    const params: WorkersParams.getAll = { offset, maxnumrows };

    if (req.query.roleId) {
        params.roleId = req.query.roleId
    }

    if (req.query.shopId) {
        params.shopId = req.query.shopId
    }
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await workersDbService.getAll(con, params, req.query.page)
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

module.exports.createWorker = async function (req, res, next) {
    const {
        name, 
        shopId, 
        roleId
    } = req.body;

    const params: WorkersParams.create = {
        name, 
        shopId, 
        roleId
    };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await workersDbService.createItem(con, params);
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


module.exports.getWorkerById = async function (req, res, next) {
    const params: WorkersParams.getById = { workerId: req.params.workerId};
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await workersDbService.getById(con, params);
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

module.exports.delWorkerById = async function (req, res, next) {
    const params: WorkersParams.getById = { workerId: req.params.workerId};
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await workersDbService.delById(con, params);
        res.status(200).json({ message: `Worker ${req.params.workerId} deleted` });
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