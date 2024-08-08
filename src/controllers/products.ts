import db_query from '../dbconnection';
import productsDbService from '../services/oracleDB/products'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllProducts = async function (req, res, next) {
    const params: {[k: string]: any} = { offset, maxnumrows };

    if (req.query.groupId) {
        params.groupId = req.query.groupId
    }
    
    try {
        const con = await db_query.getCon()
        const result = await productsDbService.getAll(con, params, req.query.page)
        res.status(200).json(result);
    } catch (error){
        next(error);
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

    const params = {
        name, 
        description, 
        vendorCost,
        image,
        groupId
    };
    
    try {
        const con = await db_query.getCon()
        const result = await productsDbService.createItem(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};


module.exports.getProductById = async function (req, res, next) {
    const params = { productId: req.params.productId };
    
    try {
        const con = await db_query.getCon()
        const result = await productsDbService.getById(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.delProductById = async function (req, res, next) {
    const params = { productId: req.params.productId };
    
    try {
        const con = await db_query.getCon()
        const result = await productsDbService.delById(con, params);
        res.status(200).json({ message: `Product ${req.params.clientId} deleted` });
    } catch (error){
        next(error);
    }
};