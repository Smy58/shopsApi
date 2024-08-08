import db_query from '../dbconnection';
import mailsDbService from '../services/oracleDB/mails'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllMail = async function (req, res, next) {
    const params: {[k: string]: any} = { offset, maxnumrows };

    if (req.query.workerId) {
        params.workerId = req.query.workerId
    }

    try {
        const con = await db_query.getCon()
        const result = await mailsDbService.getAll(con, params, req.query.page)
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.createMail = async function (req, res, next) {
    const {
        workerId, 
        mail
    } = req.body;

    const params = {
        workerId, 
        mail
    };
    
    try {
        const con = await db_query.getCon()
        const result = await mailsDbService.createItem(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};


module.exports.getMailById = async function (req, res, next) {
    const params = { mailId: req.params.mailId };
    
    try {
        const con = await db_query.getCon()
        const result = await mailsDbService.getById(con, params);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
};

module.exports.delMailById = async function (req, res, next) {
    const params = { mailId: req.params.mailId };
    
    try {
        const con = await db_query.getCon()
        const result = await mailsDbService.delById(con, params);
        res.status(200).json({ message: `Mail ${req.params.mailId} deleted` });
    } catch (error){
        next(error);
    }
};