import db_query from '../dbconnection';
import Role from '../models/role';
import { NotFoundError } from '../errors/not-found-err'

import { rolesQueryGet, insertQuery, getAddedItemQuery, getByIdQuery, deleteByIdQuery, paginationQuery } from '../queries/roles'

const maxnumrows = 20;
let offset = 0;


module.exports.getAllRole = async function (req, res, next) {
    let query = rolesQueryGet;
    
    query += paginationQuery;
    
    if (req.query.page) {
        offset = (req.query.page - 1) * maxnumrows
    }
    
    const params = { offset, maxnumrows };
    const options = { prefetchRows: maxnumrows + 1, fetchArraySize: maxnumrows };
    
    const data = await db_query.exec(query, params, options);

    const result = data.rows.map(obj => {
        return Role(obj)
    })
    
    res.status(200).json(result);
};

module.exports.createRole = async function (req, res, next) {
    const {
        name
    } = req.body;

    const query = insertQuery;
    
    const params = {
        name
    };
    
    const result = await db_query.exec(query, params, {});
    
    if (result?.lastRowid) {
        const newItemQuery = getAddedItemQuery
        const newItemData = await db_query.exec(newItemQuery, { lastRowid: result.lastRowid }, {});

        const newItemResult = Role(newItemData.rows[0])
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getRoleById = async function (req, res, next) {
    const query = getByIdQuery;
    const params = { roleId: req.params.roleId};
    
    const data = await db_query.exec(query, params, {});

    
    
    if (data.rows.length == 0) {
        next(new NotFoundError('Role not found'))
    } else {
        const result = Role(data.rows[0])

        res.status(200).json(result);
    }
};

module.exports.delRoleById = async function (req, res, next) {
    const query = deleteByIdQuery;
    const params = { roleId: req.params.roleId};
    
    
    const result = await db_query.exec(query, params, {});
    
    
    if (result.rowsAffected == 0) {

        next(new NotFoundError('Role not found'));

    } else {
        res.status(200).json({ message: `Role ${req.params.roleId} deleted` });
    }
};