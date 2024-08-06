import db_query from '../dbconnection';
import Worker from '../models/worker';

import { workersQueryGet } from '../queries/workers'


const getQuery = workersQueryGet

module.exports.getAllWorker = async function (req, res, next) {
    let query = getQuery;

    if (req.query.roleId || req.query.shopId) {
        query += ' where ';
        let and = '';
        if (req.query.roleId) {
            query += `w.role_id = ${req.query.roleId}`;
            and = ' and ';
        }

        if (req.query.shopId) {
            query += and + `w.shop_id = ${req.query.shopId}`;
        }
    }
    
    
    const params = [];
    
    const data = await db_query.exec(query,params);

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

    const query = `insert into worker (name, shop_id, role_id) values 
('${name}', ${shopId}, ${roleId})`;
    
    const params = [];
    
    const result = await db_query.exec(query,params);
    
    if (result?.lastRowid) {
        const newItemQuery = getQuery + ` where w.rowid = '${result.lastRowid}'`
        const newItemData = await db_query.exec(newItemQuery,[]);
        
        const newItemResult = newItemData.rows.map(obj => {
            return Worker(obj)
        })
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getWorkerById = async function (req, res, next) {
    const query = getQuery + ` where w.id = ${req.params.workerId}`;
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Worker(obj)
    })
    
    res.status(200).json(result);
};

module.exports.delWorkerById = async function (req, res, next) {
    const query = `delete from worker where id = ${req.params.workerId}`;
    const params = [];
    
    
    const result = await db_query.exec(query,params);
    
    
    res.status(200).json({ message: "deleted" });
};