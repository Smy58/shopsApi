import db_query from '../dbconnection';
import ShopProduct from '../models/shopProduct';

import { shopProductsQueryGet } from '../queries/shopProducts'

const getQuery = shopProductsQueryGet

module.exports.getAllShopProduct = async function (req, res, next) {
    let query = getQuery;
    

    if (req.query.shopId) {
        query += ` where shop_id = ${req.query.shopId}`
    }
    
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return ShopProduct(obj)
    })
    
    res.status(200).json(result);
};

module.exports.createShopProducts = async function (req, res, next) {
    const {
        shopId,
        productId,
        cost
    } = req.body;

    const query = `insert into shop_product (shop_id, product_id, cost) values 
(${shopId}, ${productId}, ${cost})`;
    
    const params = [];
    
    const result = await db_query.exec(query,params);
    
    if (result?.lastRowid) {
        const newItemQuery = getQuery + ` where shpr.rowid = '${result.lastRowid}'`
        const newItemData = await db_query.exec(newItemQuery,[]);
        
        const newItemResult = newItemData.rows.map(obj => {
            return ShopProduct(obj)
        })
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getShopProductById = async function (req, res, next) {
    const query = getQuery + ` where shpr.id = ${req.params.shopProductId}`;
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return ShopProduct(obj)
    })
    
    res.status(200).json(result);
};

module.exports.delShopProductById = async function (req, res, next) {
    const query = `delete from shop_product where id = ${req.params.shopProductId}`;
    const params = [];
    
    
    const result = await db_query.exec(query,params);
    
    
    res.status(200).json({ message: "deleted" });
};