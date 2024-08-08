import db_query from '../dbconnection';
import statusesDbService from '../services/oracleDB/statuses'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllStatus = async function (req, res, next) {
    const params = { offset, maxnumrows };
    
    let con = undefined
    try {
        const con = await db_query.getCon()
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

    const params = {
        name
    };
    
    let con = undefined
    try {
        const con = await db_query.getCon()
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
    const params = { statusId: req.params.statusId};
    
    let con = undefined
    try {
        const con = await db_query.getCon()
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
    const params = { statusId: req.params.statusId};
    
    let con = undefined
    try {
        const con = await db_query.getCon()
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