import db_query from '../dbconnection';
import Status from '../models/status';

import { statusesQueryGet } from '../queries/statuses'

const getQuery = statusesQueryGet

module.exports.getAllStatus = async function (req, res, next) {
    let query = getQuery;
    
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Status(obj)
    })
    
    res.status(200).json(result);
};

module.exports.createStatus = async function (req, res, next) {
    const {
        name
    } = req.body;

    const query = `insert into status (name) values 
('${name}')`;
    
    const params = [];
    
    const result = await db_query.exec(query,params);
    
    if (result?.lastRowid) {
        const newItemQuery = getQuery + ` where st.rowid = '${result.lastRowid}'`
        const newItemData = await db_query.exec(newItemQuery,[]);
        
        const newItemResult = newItemData.rows.map(obj => {
            return Status(obj)
        })
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};

module.exports.getStatusById = async function (req, res, next) {
    const query = getQuery + ` where st.id = ${req.params.statusId}`;
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Status(obj)
    })
    
    res.status(200).json(result);
};

module.exports.delStatusById = async function (req, res, next) {
    const query = `delete from status where id = ${req.params.statusId}`;
    const params = [];
    
    
    const result = await db_query.exec(query,params);
    
    
    res.status(200).json({ message: "deleted" });
};