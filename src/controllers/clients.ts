import db_query from '../dbconnection';
import Client from '../models/client';
import { NotFoundError } from '../errors/not-found-err'

import { clientsQueryGet, insertQuery, getAddedItemQuery, getByIdQuery, deleteByIdQuery, paginationQuery } from '../queries/clients'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllClient = async function (req, res, next) {
    let query = clientsQueryGet;
    
    query += paginationQuery;
    
    if (req.query.page) {
        offset = (req.query.page - 1) * maxnumrows
    }
    
    const params = { offset, maxnumrows };
    const options = { prefetchRows: maxnumrows + 1, fetchArraySize: maxnumrows };
    
    const data = await db_query.exec(query, params, options);

    const result = data.rows.map(obj => {
        return Client(obj)
    })
    
    res.status(200).json(result);
};

module.exports.createClient = async function (req, res, next) {
    const {
        name,
        address,
        phone,
        mail
    } = req.body;

    const query = insertQuery;
    
    const params = {
        name,
        address,
        phone,
        mail
    };    
    
    const result = await db_query.exec(query, params, {});
    
    if (result?.lastRowid) {
        const newItemQuery = getAddedItemQuery
        const newItemData = await db_query.exec(newItemQuery, { lastRowid: result.lastRowid }, {});

        const newItemResult = Client(newItemData.rows[0])
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getClientById = async function (req, res, next) {
    const query = getByIdQuery;
    const params = { clientId: req.params.clientId };
    
    const data = await db_query.exec(query, params, {});

    if (data.rows.length == 0) {
        next(new NotFoundError('Shop not found'))
    } else {
        const result = Client(data.rows[0])
        res.status(200).json(result);
    }
};

module.exports.delClientById = async function (req, res, next) {
    const query = deleteByIdQuery;
    const params = { clientId: req.params.clientId };
    
    
    const result = await db_query.exec(query, params, {});
    
    
    if (result.rowsAffected == 0) {

        next(new NotFoundError('Client not found'));

    } else {
        res.status(200).json({ message: `Client ${req.params.clientId} deleted` });
    }
};