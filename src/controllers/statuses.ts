import db_query from '../dbconnection';
import statusesDbService from '../services/oracleDB/statuses'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllStatus = async function (req, res, next) {
    const params = { offset, maxnumrows };
    
    try {
        const con = await db_query.getCon()
        const result = await statusesDbService.getAll(con, params, req.query.page)
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.createStatus = async function (req, res, next) {
    const {
        name
    } = req.body;

    const params = {
        name
    };
    
    try {
        const con = await db_query.getCon()
        const result = await statusesDbService.createItem(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.getStatusById = async function (req, res, next) {
    const params = { statusId: req.params.statusId};
    
    try {
        const con = await db_query.getCon()
        const result = await statusesDbService.getById(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.delStatusById = async function (req, res, next) {
    const params = { statusId: req.params.statusId};
    
    try {
        const con = await db_query.getCon()
        const result = await statusesDbService.delById(con, params);
        res.status(200).json({ message: `Status ${req.params.statusId} deleted` });
    } catch (error){
        next(error);
    }
};