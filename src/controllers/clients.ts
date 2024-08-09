import OracleDB from 'oracledb';
import db_query from '../dbconnection';
import clientsDbService from '../services/oracleDB/clients'
import { ClientParams } from '../types/params'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllClient = async function (req, res, next) {
    const params: ClientParams.getAll = { offset, maxnumrows };

    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await clientsDbService.getAll(con, params, req.query.page)
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

module.exports.createClient = async function (req, res, next) {
    const {
        name,
        address,
        phone,
        mail
    } = req.body;
    
    const params: ClientParams.create = {
        name,
        address,
        phone,
        mail
    };    

    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await clientsDbService.createItem(con, params);
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


module.exports.getClientById = async function (req, res, next) {
    const params: ClientParams.getById = { clientId: req.params.clientId };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await clientsDbService.getById(con, params);
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

module.exports.delClientById = async function (req, res, next) {
    const params: ClientParams.getById = { clientId: req.params.clientId };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await clientsDbService.delById(con, params);
        res.status(200).json({ message: `Client ${req.params.clientId} deleted` });
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