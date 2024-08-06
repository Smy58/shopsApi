import db_query from '../dbconnection';
import Shop from '../models/shop';

import { shopsQueryGet } from '../queries/shops'


const getQuery = shopsQueryGet

module.exports.getAllShops = async function (req, res, next) {
    const query = getQuery;
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Shop(obj)
    })
    
    res.status(200).json(result);
};

module.exports.createShop = async function (req, res, next) {
    const {
        name, 
        address, 
        workTimeStart,
        workTimeEnd,
        waitingTime,
        image
    } = req.body;

    const query = `insert into shop (name, address, work_time_start, work_time_end, waiting_time, image) values 
('${name}', '${address}', '${workTimeStart}', '${workTimeEnd}', ${waitingTime}, '${image}')`;
    
    const params = [];
    
    const result = await db_query.exec(query,params);
    
    if (result?.lastRowid) {
        const newItemQuery = getQuery + ` where sh.rowid = '${result.lastRowid}'`
        const newItemData = await db_query.exec(newItemQuery,[]);
        const newItemResult = newItemData.rows.map(obj => {
            return Shop(obj)
        })
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getShopById = async function (req, res, next) {
    const query = getQuery + ` where sh.id = ${req.params.shopId}`;
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Shop(obj)
    })
    
    res.status(200).json(result);
};

module.exports.delShopById = async function (req, res, next) {
    const query = `delete from shop where id = ${req.params.shopId}`;
    const params = [];
    
    
    const result = await db_query.exec(query,params);
    
    
    res.status(200).json({ message: "deleted" });
};