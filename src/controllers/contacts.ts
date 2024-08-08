import db_query from '../dbconnection';
import contactsDbService from '../services/oracleDB/contacts'


const maxnumrows = 20;
let offset = 0;

module.exports.getAllContact = async function (req, res, next) {

    const params: {[k: string]: any} = { offset, maxnumrows };

    if (req.query.workerId) {
        params.workerId = req.query.workerId
    }
    
    try {
        const con = await db_query.getCon()
        const result = await contactsDbService.getAll(con, params, req.query.page)
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.createContact = async function (req, res, next) {
    const {
        workerId, 
        phone
    } = req.body;

    const params = {
        workerId, 
        phone
    };
    
    try {
        const con = await db_query.getCon()
        const result = await contactsDbService.createItem(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};


module.exports.getContactById = async function (req, res, next) {
    const params = { contactId: req.params.contactId };
    
    try {
        const con = await db_query.getCon()
        const result = await contactsDbService.getById(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.delContactById = async function (req, res, next) {
    const params = { contactId: req.params.contactId };
    
    try {
        const con = await db_query.getCon()
        const result = await contactsDbService.delById(con, params);
        res.status(200).json({ message: `Contact ${req.params.clientId} deleted` });
    } catch (error){
        next(error);
    }
};