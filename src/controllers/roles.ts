import OracleDB from 'oracledb';
import db_query from '../dbconnection';
import rolesDbService from '../services/oracleDB/roles'
import { RolesParams } from '../types/params'
const maxnumrows = 20;
let offset = 0;


module.exports.getAllRole = async function (req, res, next) {
    const params: RolesParams.getAll = { offset, maxnumrows };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await rolesDbService.getAll(con, params, req.query.page)
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

module.exports.createRole = async function (req, res, next) {
    const {
        name
    } = req.body;

    const params: RolesParams.create = {
        name
    };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await rolesDbService.createItem(con, params);
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


module.exports.getRoleById = async function (req, res, next) {
    const params: RolesParams.getById = { roleId: req.params.roleId};
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await rolesDbService.getById(con, params);
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

module.exports.delRoleById = async function (req, res, next) {
    const params: RolesParams.getById = { roleId: req.params.roleId};
    
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await rolesDbService.delById(con, params);
        res.status(200).json({ message: `Role ${req.params.roleId} deleted` });
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