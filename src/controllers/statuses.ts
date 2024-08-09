import OracleDB from 'oracledb';
import db_query from '../dbconnection';
import statusesDbService from '../services/oracleDB/statuses'
import { StatusesParams } from '../types/params'
const maxnumrows = 20;
let offset = 0;

module.exports.getAllStatus = async function (req, res, next) {
    const params: StatusesParams.getAll = { offset, maxnumrows };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await statusesDbService.getAll(con, params, req.query.page)
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

module.exports.createStatus = async function (req, res, next) {
    const {
        name
    } = req.body;

    const params: StatusesParams.create = {
        name
    };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await statusesDbService.createItem(con, params);
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

module.exports.getStatusById = async function (req, res, next) {
    const params: StatusesParams.getById = { statusId: req.params.statusId};
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await statusesDbService.getById(con, params);
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

module.exports.delStatusById = async function (req, res, next) {
    const params: StatusesParams.getById = { statusId: req.params.statusId};
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await statusesDbService.delById(con, params);
        res.status(200).json({ message: `Status ${req.params.statusId} deleted` });
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