import db_query from '../dbconnection';
import groupsDbService from '../services/oracleDB/groups'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllGroup = async function (req, res, next) {
    const params = { offset, maxnumrows };
    
    let con = undefined
    try {
        const con = await db_query.getCon()
        const result = await groupsDbService.getAll(con, params, req.query.page)
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

module.exports.createGroup = async function (req, res, next) {
    const {
        name
    } = req.body;

    const params = {
        name
    };
    
    let con = undefined
    try {
        const con = await db_query.getCon()
        const result = await groupsDbService.createItem(con, params);
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


module.exports.getGroupById = async function (req, res, next) {
    const params = { groupId: req.params.groupId};
    
    let con = undefined
    try {
        const con = await db_query.getCon()
        const result = await groupsDbService.getById(con, params);
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

module.exports.delGroupById = async function (req, res, next) {
    const params = { groupId: req.params.groupId};
    
    let con = undefined
    try {
        const con = await db_query.getCon()
        const result = await groupsDbService.delById(con, params);
        res.status(200).json({ message: `Group ${req.params.groupId} deleted` });
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