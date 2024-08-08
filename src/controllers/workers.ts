import db_query from '../dbconnection';
import workersDbService from '../services/oracleDB/workers'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllWorker = async function (req, res, next) {
    const params: {[k: string]: any} = { offset, maxnumrows };

    if (req.query.roleId) {
        params.roleId = req.query.roleId
    }

    if (req.query.shopId) {
        params.shopId = req.query.shopId
    }
    
    try {
        const con = await db_query.getCon()
        const result = await workersDbService.getAll(con, params, req.query.page)
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.createWorker = async function (req, res, next) {
    const {
        name, 
        shopId, 
        roleId
    } = req.body;

    const params = {
        name, 
        shopId, 
        roleId
    };
    
    try {
        const con = await db_query.getCon()
        const result = await workersDbService.createItem(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};


module.exports.getWorkerById = async function (req, res, next) {
    const params = { workerId: req.params.workerId};
    
    try {
        const con = await db_query.getCon()
        const result = await workersDbService.getById(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.delWorkerById = async function (req, res, next) {
    const params = { workerId: req.params.workerId};
    
    try {
        const con = await db_query.getCon()
        const result = await workersDbService.delById(con, params);
        res.status(200).json({ message: `Worker ${req.params.workerId} deleted` });
    } catch (error){
        next(error);
    }
};