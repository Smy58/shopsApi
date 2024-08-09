import OracleDB from 'oracledb';
import db_query from '../dbconnection';
import mailsDbService from '../services/oracleDB/mails'
import { MailsParams } from '../types/params'
const maxnumrows = 20;
let offset = 0;

module.exports.getAllMail = async function (req, res, next) {
    const params: MailsParams.getAll = { offset, maxnumrows };

    if (req.query.workerId) {
        params.workerId = req.query.workerId
    }

    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await mailsDbService.getAll(con, params, req.query.page)
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

module.exports.createMail = async function (req, res, next) {
    const {
        workerId, 
        mail
    } = req.body;

    const params: MailsParams.create = {
        workerId, 
        mail
    };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await mailsDbService.createItem(con, params);
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


module.exports.getMailById = async function (req, res, next) {
    const params: MailsParams.getById = { mailId: req.params.mailId };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await mailsDbService.getById(con, params);
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

module.exports.delMailById = async function (req, res, next) {
    const params: MailsParams.getById = { mailId: req.params.mailId };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await mailsDbService.delById(con, params);
        res.status(200).json({ message: `Mail ${req.params.mailId} deleted` });
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