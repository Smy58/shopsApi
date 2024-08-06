import db_query from '../dbconnection';
import Client from '../models/client';

import { clientsQueryGet } from '../queries/clients'

const getQuery = clientsQueryGet;

module.exports.getAllClient = async function (req, res, next) {
    let query = getQuery;
    
    const params = [];
    
    const data = await db_query.exec(query,params);

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

    const query = `insert into client (name, address, phone, mail) values 
('${name}', '${address}', '${phone}', '${mail}')`;
    
    const params = [];
    
    const result = await db_query.exec(query,params);
    
    if (result?.lastRowid) {
        const newItemQuery = getQuery + ` where cl.rowid = '${result.lastRowid}'`
        const newItemData = await db_query.exec(newItemQuery,[]);

        const newItemResult = newItemData.rows.map(obj => {
            return Client(obj)
        })
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getClientById = async function (req, res, next) {
    const query = getQuery + ` where cl.id = ${req.params.clientId}`;
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Client(obj)
    })
    
    res.status(200).json(result);
};

module.exports.delClientById = async function (req, res, next) {
    const query = `delete from client where id = ${req.params.clientId}`;
    const params = [];
    
    
    const result = await db_query.exec(query,params);
    
    
    res.status(200).json({ message: "deleted" });
};