import db_query from '../dbconnection';
import Group from '../models/group';
import { NotFoundError } from '../errors/not-found-err'

import { groupsQueryGet, insertQuery, getAddedItemQuery, getByIdQuery, deleteByIdQuery, paginationQuery } from '../queries/groups'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllGroup = async function (req, res, next) {
    let query = groupsQueryGet;
    
    query += paginationQuery;
    
    if (req.query.page) {
        offset = (req.query.page - 1) * maxnumrows
    }
    
    const params = { offset, maxnumrows };
    const options = { prefetchRows: maxnumrows + 1, fetchArraySize: maxnumrows };
    
    const data = await db_query.exec(query, params, options);

    const result = data.rows.map(obj => {
        return Group(obj)
    })
    
    
    res.status(200).json(result);
};

module.exports.createGroup = async function (req, res, next) {
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

        
        const newItemResult = Group(newItemData.rows[0])
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getGroupById = async function (req, res, next) {
    const query = getByIdQuery;
    const params = { groupId: req.params.groupId};
    
    const data = await db_query.exec(query, params, {});

    
    if (data.rows.length == 0) {
        next(new NotFoundError('Group not found'))
    } else {
        const result = Group(data.rows[0])

        res.status(200).json(result);
    }
};

module.exports.delGroupById = async function (req, res, next) {
    const query = deleteByIdQuery;
    const params = { groupId: req.params.groupId};
    
    
    const result = await db_query.exec(query, params, {});
    
    
    if (result.rowsAffected == 0) {

        next(new NotFoundError('Group not found'));

    } else {
        res.status(200).json({ message: `Group ${req.params.groupId} deleted` });
    }
};