import db_query from '../dbconnection';
import Contact from '../models/contact';

import { contactsQueryGet } from '../queries/contacts'

const getQuery = contactsQueryGet

module.exports.getAllContact = async function (req, res, next) {
    let query = getQuery;
    if (req.query.workerId) {
        query += ` where worker_id = ${req.query.workerId}`
    }
    
    const params = [];
    
    const data = await db_query.exec(query,params);

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

    const query = `insert into contact (phone, worker_id) values 
('${phone}', ${workerId})`;
    
    const params = [];
    
    const result = await db_query.exec(query,params);

    console.log(result);
    console.log(result?.lastRowid);
    
    if (result?.lastRowid) {
        const newItemQuery = getQuery + ` where c.rowid = '${result.lastRowid}'`
        const newItemData = await db_query.exec(newItemQuery,[]);
        
        const newItemResult = newItemData.rows.map(obj => {
            return Contact(obj)
        })
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getContactById = async function (req, res, next) {
    const query = getQuery + ` where c.id = ${req.params.contactId}`;
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Contact(obj)
    })
    
    res.status(200).json(result);
};

module.exports.delContactById = async function (req, res, next) {
    const query = `delete from contact where id = ${req.params.contactId}`;
    const params = [];
    
    
    const result = await db_query.exec(query,params);
    
    
    res.status(200).json({ message: "deleted" });
};