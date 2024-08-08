import db_query from '../dbconnection';
import groupsDbService from '../services/oracleDB/groups'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllGroup = async function (req, res, next) {
    const params = { offset, maxnumrows };
    
    try {
        const con = await db_query.getCon()
        const result = await groupsDbService.getAll(con, params, req.query.page)
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.createGroup = async function (req, res, next) {
    const {
        name
    } = req.body;

    const params = {
        name
    };
    
    try {
        const con = await db_query.getCon()
        const result = await groupsDbService.createItem(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};


module.exports.getGroupById = async function (req, res, next) {
    const params = { groupId: req.params.groupId};
    
    try {
        const con = await db_query.getCon()
        const result = await groupsDbService.getById(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.delGroupById = async function (req, res, next) {
    const params = { groupId: req.params.groupId};
    
    try {
        const con = await db_query.getCon()
        const result = await groupsDbService.delById(con, params);
        res.status(200).json({ message: `Group ${req.params.groupId} deleted` });
    } catch (error){
        next(error);
    }
};