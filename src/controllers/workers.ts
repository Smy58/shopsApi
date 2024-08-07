import db_query from '../dbconnection';
import Worker from '../models/worker';
import { NotFoundError } from '../errors/not-found-err'

import { workersQueryGet, insertQuery, getAddedItemQuery, getByIdQuery, deleteByIdQuery, paginationQuery } from '../queries/workers'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllWorker = async function (req, res, next) {
    let query = workersQueryGet;

    if (req.query.page) {
        offset = (req.query.page - 1) * maxnumrows
    }

    const params: {[k: string]: any} = { offset, maxnumrows };

    if (req.query.roleId || req.query.shopId) {
        query += ' where ';
        let and = '';
        if (req.query.roleId) {
            query += `w.role_id = :roleId`;
            and = ' and ';
            params.roleId = req.query.roleId
        }

        if (req.query.shopId) {
            query += and + `w.shop_id = :shopId`;
            params.shopId = req.query.shopId

        }
    }
    
    
    query += paginationQuery;
    
    const options = { prefetchRows: maxnumrows + 1, fetchArraySize: maxnumrows };
    
    const data = await db_query.exec(query, params, options);

    const result = data.rows.map(obj => {
        return Worker(obj)
    })
    
    res.status(200).json(result);
};

module.exports.createWorker = async function (req, res, next) {
    const {
        name, 
        shopId, 
        roleId
    } = req.body;

    const query = insertQuery;
    
    const params = {
        name, 
        shopId, 
        roleId
    };
    
    const result = await db_query.exec(query, params, {});
    
    if (result?.lastRowid) {
        const newItemQuery = getAddedItemQuery
        const newItemData = await db_query.exec(newItemQuery, { lastRowid: result.lastRowid }, {});
        
        const newItemResult = Worker(newItemData.rows[0])
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getWorkerById = async function (req, res, next) {
    const query = getByIdQuery;
    const params = { workerId: req.params.workerId};
    
    const data = await db_query.exec(query, params, {});

    
    if (data.rows.length == 0) {
        next(new NotFoundError('Worker not found'))
    } else {
        const result = Worker(data.rows[0])

        res.status(200).json(result);
    }
};

module.exports.delWorkerById = async function (req, res, next) {
    const query = deleteByIdQuery;
    const params = { workerId: req.params.workerId};
    
    
    const result = await db_query.exec(query, params, {});
    
    
    if (result.rowsAffected == 0) {

        next(new NotFoundError('Worker not found'));

    } else {
        res.status(200).json({ message: `Worker ${req.params.workerId} deleted` });
    }
};