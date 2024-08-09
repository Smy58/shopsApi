import OracleDB from 'oracledb';
import db_query from '../dbconnection';
import productsDbService from '../services/oracleDB/products'
import { ProductsParams } from '../types/params'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllProducts = async function (req, res, next) {
    const params: ProductsParams.getAll = { offset, maxnumrows };

    if (req.query.groupId) {
        params.groupId = req.query.groupId
    }
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await productsDbService.getAll(con, params, req.query.page)
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

module.exports.createProduct = async function (req, res, next) {
    const {
        name, 
        description, 
        vendorCost,
        image,
        groupId
    } = req.body;

    const params: ProductsParams.create = {
        name, 
        description, 
        vendorCost,
        image,
        groupId
    };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await productsDbService.createItem(con, params);
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


module.exports.getProductById = async function (req, res, next) {
    const params: ProductsParams.getById = { productId: req.params.productId };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await productsDbService.getById(con, params);
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

module.exports.delProductById = async function (req, res, next) {
    const params: ProductsParams.getById = { productId: req.params.productId };
    
    let con: OracleDB.Connection = undefined
    try {
        con = await db_query.getCon()
        const result = await productsDbService.delById(con, params);
        res.status(200).json({ message: `Product ${req.params.productId} deleted` });
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