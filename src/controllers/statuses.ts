import db_query from '../dbconnection';
import Status from '../models/status';
import { NotFoundError } from '../errors/not-found-err'

import { statusesQueryGet, insertQuery, getAddedItemQuery, getByIdQuery, deleteByIdQuery, paginationQuery } from '../queries/statuses'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllStatus = async function (req, res, next) {
    let query = statusesQueryGet;
    
    query += paginationQuery;
    
    if (req.query.page) {
        offset = (req.query.page - 1) * maxnumrows
    }
    
    const params = { offset, maxnumrows };
    const options = { prefetchRows: maxnumrows + 1, fetchArraySize: maxnumrows };
    
    const data = await db_query.exec(query, params, options);

    const result = data.rows.map(obj => {
        return Status(obj)
    })
    
    res.status(200).json(result);
};

module.exports.createStatus = async function (req, res, next) {
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
        
        const newItemResult = Status(newItemData.rows[0])
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};

module.exports.getStatusById = async function (req, res, next) {
    const query = getByIdQuery;
    const params = { statusId: req.params.statusId};
    
    const data = await db_query.exec(query, params, {});

    
    if (data.rows.length == 0) {
        next(new NotFoundError('Status not found'))
    } else {
        const result = Status(data.rows[0])

        res.status(200).json(result);
    }
};

module.exports.delStatusById = async function (req, res, next) {
    const query = deleteByIdQuery;
    const params = { statusId: req.params.statusId};
    
    
    const result = await db_query.exec(query, params, {});
    
    
    if (result.rowsAffected == 0) {

        next(new NotFoundError('Status not found'));

    } else {
        res.status(200).json({ message: `Status ${req.params.statusId} deleted` });
    }
};