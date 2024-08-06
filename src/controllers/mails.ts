import db_query from '../dbconnection';
import Mail from '../models/mail';

import { mailsQueryGet } from '../queries/mails'

const getQuery = mailsQueryGet

module.exports.getAllMail = async function (req, res, next) {
    let query = getQuery;
    if (req.query.workerId) {
        query += ` where worker_id = ${req.query.workerId}`
    }

    const params = [];
    
    const data = await db_query.exec(query,params);

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

    const query = `insert into mail (mail, worker_id) values 
('${mail}', ${workerId})`;
    
    const params = [];
    
    const result = await db_query.exec(query,params);
    
    if (result?.lastRowid) {
        const newItemQuery = getQuery + ` where m.rowid = '${result.lastRowid}'`
        const newItemData = await db_query.exec(newItemQuery,[]);

        const newItemResult = newItemData.rows.map(obj => {
            return Mail(obj)
        })
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getMailById = async function (req, res, next) {
    const query = getQuery + ` where m.id = ${req.params.mailId}`;
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Mail(obj)
    })
    
    res.status(200).json(result);
};

module.exports.delMailById = async function (req, res, next) {
    const query = `delete from mail where id = ${req.params.mailId}`;
    const params = [];
    
    const result = await db_query.exec(query,params);
    
    res.status(200).json({ message: "deleted" });
};