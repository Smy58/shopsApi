import db_query from '../dbconnection';
import Contact from '../models/contact';
import { NotFoundError } from '../errors/not-found-err'

import { contactsQueryGet, insertQuery, getAddedItemQuery, getByIdQuery, deleteByIdQuery, paginationQuery } from '../queries/contacts'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllContact = async function (req, res, next) {
    let query = contactsQueryGet;

    if (req.query.page) {
        offset = (req.query.page - 1) * maxnumrows
    }

    const params: {[k: string]: any} = { offset, maxnumrows };

    if (req.query.workerId) {
        query += ` where worker_id = :workerId`
        params.workerId = req.query.workerId
    }
    
    query += paginationQuery;
    
    const options = { prefetchRows: maxnumrows + 1, fetchArraySize: maxnumrows };
    
    const data = await db_query.exec(query, params, options);

    const result = data.rows.map(obj => {
        return Contact(obj)
    })

    res.status(200).json(result);
};

module.exports.createContact = async function (req, res, next) {
    const {
        workerId, 
        phone
    } = req.body;

    const query = insertQuery;
    
    const params = {
        workerId, 
        phone
    };
    
    const result = await db_query.exec(query, params, {});
    
    if (result?.lastRowid) {
        const newItemQuery = getAddedItemQuery
        const newItemData = await db_query.exec(newItemQuery, { lastRowid: result.lastRowid }, {});
        
        const newItemResult = Contact(newItemData.rows[0]);
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getContactById = async function (req, res, next) {
    const query = getByIdQuery;
    const params = { contactId: req.params.contactId };
    
    const data = await db_query.exec(query, params, {});


    if (data.rows.length == 0) {
        next(new NotFoundError('Contact not found'))
    } else {
        const result = Contact(data.rows[0])
        res.status(200).json(result);
    }
};

module.exports.delContactById = async function (req, res, next) {
    const query = deleteByIdQuery;
    const params = { contactId: req.params.contactId };
    
    
    const result = await db_query.exec(query, params, {});
    
    
    if (result.rowsAffected == 0) {

        next(new NotFoundError('Contact not found'));

    } else {
        res.status(200).json({ message: `Contact ${req.params.contactId} deleted` });
    }
};