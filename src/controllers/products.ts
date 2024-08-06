import db_query from '../dbconnection';
import Product from '../models/product';

import { productsQueryGet } from '../queries/products'

const getQuery = productsQueryGet

module.exports.getAllProducts = async function (req, res, next) {
    let query = getQuery;
    if (req.query.groupId) {
        query += ` where pr.group_id = ${req.query.groupId}`
    }
    
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Product(obj)
    })
    
    
    res.status(200).json(result);
};

module.exports.createProduct = async function (req, res, next) {
    const {
        name, 
        description, 
        vendorCost,
        image,
        groupId
    } = req.body;

    const query = `insert into product (name, description, vendor_cost, image, group_id) values 
('${name}', '${description}', ${vendorCost}, '${image}', ${groupId})`;
    
    const params = [];
    
    const result = await db_query.exec(query,params);

    console.log(result);
    console.log(result?.lastRowid);
    
    if (result?.lastRowid) {
        const newItemQuery = getQuery + ` where pr.rowid = '${result.lastRowid}'`
        const newItemData = await db_query.exec(newItemQuery,[]);
        
        const newItemResult = newItemData.rows.map(obj => {
            return Product(obj)
        })

        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getProductById = async function (req, res, next) {
    const query = getQuery + ` where pr.id = ${req.params.productId}`;
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Product(obj)
    })
    
    res.status(200).json(result);
};

module.exports.delProductById = async function (req, res, next) {
    const query = `delete from product where id = ${req.params.productId}`;
    const params = [];
    
    
    const result = await db_query.exec(query,params);
    
    
    res.status(200).json({ message: "deleted" });
};