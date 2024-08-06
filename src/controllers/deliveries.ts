import db_query from '../dbconnection';
import Delivery from '../models/delivery';

import { deliveriesQueryGet } from '../queries/deliveries'

const getQuery = deliveriesQueryGet

module.exports.getAllDelivery = async function (req, res, next) {
    let query = getQuery;
    
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Delivery(obj)
    })
    
    res.status(200).json(result);
};

module.exports.createDelivery = async function (req, res, next) {
    const {
        workerId
    } = req.body;

    const query = `insert into delivery (worker_id) values 
(${workerId})`;
    
    const params = [];
    
    const result = await db_query.exec(query,params);

    if (result?.lastRowid) {
        const newItemQuery = getQuery + ` where dl.rowid = '${result.lastRowid}'`
        const newItemData = await db_query.exec(newItemQuery,[]);

        const newItemResult = newItemData.rows.map(obj => {
            return Delivery(obj)
        })
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getDeliveryById = async function (req, res, next) {
    const query = getQuery + ` where dl.id = ${req.params.deliveryId}`;
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Delivery(obj)
    })
    
    res.status(200).json(result);
};

module.exports.delDeliveryById = async function (req, res, next) {
    const query = `delete from delivery where id = ${req.params.deliveryId}`;
    const params = [];
    
    
    const result = await db_query.exec(query,params);
    
    
    res.status(200).json({ message: "deleted" });
};