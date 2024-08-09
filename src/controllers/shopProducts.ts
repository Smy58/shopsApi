import OracleDB from 'oracledb';
import db_query from '../dbconnection';
import shopProductsDbService from '../services/oracleDB/shopProducts'
import { ShopProductsParams } from '../types/params'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllShopProduct = async function (req, res, next) {
    const params: ShopProductsParams.getAll = { offset, maxnumrows };

    if (req.query.shopId) {
        params.shopId = req.query.shopId
    }
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await shopProductsDbService.getAll(con, params, req.query.page)
        res.status(200).json(result);
    } catch (error){
        next(error);
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                throw(err);
            }
        }
    }
};

module.exports.createShopProducts = async function (req, res, next) {
    const {
        shopId,
        productId,
        cost
    } = req.body;

    const params: ShopProductsParams.create = {
        shopId,
        productId,
        cost
    };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await shopProductsDbService.createItem(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                throw(err);
            }
        }
    }
};


module.exports.getShopProductById = async function (req, res, next) {
    const params: ShopProductsParams.getById = { shopProductId: req.params.shopProductId};
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await shopProductsDbService.getById(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                throw(err);
            }
        }
    }
};

module.exports.delShopProductById = async function (req, res, next) {
    const params: ShopProductsParams.getById = { shopProductId: req.params.shopProductId};
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await shopProductsDbService.delById(con, params);
        res.status(200).json({ message: `ShopProduct ${req.params.shopProductId} deleted` });
    } catch (error){
        next(error);
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                throw(err);
            }
        }
    }
};