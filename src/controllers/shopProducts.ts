import db_query from '../dbconnection';
import shopProductsDbService from '../services/oracleDB/shopProducts'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllShopProduct = async function (req, res, next) {
    const params: {[k: string]: any} = { offset, maxnumrows };

    if (req.query.shopId) {
        params.shopId = req.query.shopId
    }
    
    try {
        const con = await db_query.getCon()
        const result = await shopProductsDbService.getAll(con, params, req.query.page)
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.createShopProducts = async function (req, res, next) {
    const {
        shopId,
        productId,
        cost
    } = req.body;

    const params = {
        shopId,
        productId,
        cost
    };
    
    try {
        const con = await db_query.getCon()
        const result = await shopProductsDbService.createItem(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};


module.exports.getShopProductById = async function (req, res, next) {
    const params = { shopProductId: req.params.shopProductId};
    
    try {
        const con = await db_query.getCon()
        const result = await shopProductsDbService.getById(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.delShopProductById = async function (req, res, next) {
    const params = { shopProductId: req.params.shopProductId};
    
    try {
        const con = await db_query.getCon()
        const result = await shopProductsDbService.delById(con, params);
        res.status(200).json({ message: `ShopProduct ${req.params.shopProductId} deleted` });
    } catch (error){
        next(error);
    }
};