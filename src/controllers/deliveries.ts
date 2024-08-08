import db_query from '../dbconnection';
import deliveriesDbService from '../services/oracleDB/deliveries'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllDelivery = async function (req, res, next) {
    const params = { offset, maxnumrows };
    
    try {
        const con = await db_query.getCon()
        const result = await deliveriesDbService.getAll(con, params, req.query.page)
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.createDelivery = async function (req, res, next) {
    const {
        workerId
    } = req.body;

    const params = {
        workerId
    };
    
    
    try {
        const con = await db_query.getCon()
        const result = await deliveriesDbService.createItem(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};


module.exports.getDeliveryById = async function (req, res, next) {
    const params = { deliveryId: req.params.deliveryId };
    
    try {
        const con = await db_query.getCon()
        const result = await deliveriesDbService.getById(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.delDeliveryById = async function (req, res, next) {
    const params = { deliveryId: req.params.deliveryId };
    
    try {
        const con = await db_query.getCon()
        const result = await deliveriesDbService.delById(con, params);
        res.status(200).json({ message: `Delivery ${req.params.deliveryId} deleted` });
    } catch (error){
        next(error);
    }
};