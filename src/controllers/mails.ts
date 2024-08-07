import db_query from '../dbconnection';
import Mail from '../models/mail';
import { NotFoundError } from '../errors/not-found-err'

import { mailsQueryGet, insertQuery, getAddedItemQuery, getByIdQuery, deleteByIdQuery, paginationQuery } from '../queries/mails'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllMail = async function (req, res, next) {
    let query = mailsQueryGet;

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
        return Mail(obj)
    })
    
    res.status(200).json(result);
};

module.exports.createMail = async function (req, res, next) {
    const {
        workerId, 
        mail
    } = req.body;

    const query = insertQuery;
    
    const params = {
        workerId, 
        mail
    };
    
    const result = await db_query.exec(query, params, {});
    
    if (result?.lastRowid) {
        const newItemQuery = getAddedItemQuery
        const newItemData = await db_query.exec(newItemQuery, { lastRowid: result.lastRowid }, {});

        const newItemResult = Mail(newItemData.rows[0])
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getMailById = async function (req, res, next) {
    const query = getByIdQuery;
    const params = { mailId: req.params.mailId };
    
    const data = await db_query.exec(query, params, {});

    
    
    if (data.rows.length == 0) {
        next(new NotFoundError('Mail not found'))
    } else {
        const result = Mail(data.rows[0])
        res.status(200).json(result);
    }
};

module.exports.delMailById = async function (req, res, next) {
    const query = deleteByIdQuery;
    const params = { mailId: req.params.mailId };
    
    const result = await db_query.exec(query, params, {});
    
    if (result.rowsAffected == 0) {

        next(new NotFoundError('Mail not found'));

    } else {
        res.status(200).json({ message: `Mail ${req.params.mailId} deleted` });
    }
};