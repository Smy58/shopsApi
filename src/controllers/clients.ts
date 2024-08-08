import db_query from '../dbconnection';
import clientsDbService from '../services/oracleDB/clients'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllClient = async function (req, res, next) {
    const params = { offset, maxnumrows };

    try {
        const con = await db_query.getCon()
        const result = await clientsDbService.getAll(con, params, req.query.page)
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.createClient = async function (req, res, next) {
    const {
        name,
        address,
        phone,
        mail
    } = req.body;
    
    const params = {
        name,
        address,
        phone,
        mail
    };    

    try {
        const con = await db_query.getCon()
        const result = await clientsDbService.createItem(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
    
};


module.exports.getClientById = async function (req, res, next) {
    const params = { clientId: req.params.clientId };
    
    try {
        const con = await db_query.getCon()
        const result = await clientsDbService.getById(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.delClientById = async function (req, res, next) {
    const params = { clientId: req.params.clientId };
    
    try {
        const con = await db_query.getCon()
        const result = await clientsDbService.delById(con, params);
        res.status(200).json({ message: `Client ${req.params.clientId} deleted` });
    } catch (error){
        next(error);
    }
    
};