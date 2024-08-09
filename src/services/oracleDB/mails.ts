import { NotFoundError } from "../../errors/not-found-err";
import Mail from "../../models/mail";
import { mailsQueryGet, deleteByIdQuery, getAddedItemQuery, getByIdQuery, insertQuery, paginationQuery } from "../../queries/mails";
import oracledb from 'oracledb'
import { MailsParams } from '../../types/params'


const getAll = async function (con: oracledb.Connection, params: MailsParams.getAll, page: number) {
    let query = mailsQueryGet;
    
    if (params.workerId) {
        query += ` where worker_id = :workerId`
    }

    query += paginationQuery;
    
    if (page) {
        params.offset = (page - 1) * params.maxnumrows
    }
    
    const options = { prefetchRows: params.maxnumrows + 1, fetchArraySize: params.maxnumrows };
    
    try {
        const data = await con.execute(query,params, options);
        const result = data.rows.map(obj => {
            return Mail(obj)
        })

        return result
    } catch (error){
        throw (error);
    } 
}

const createItem = async function (con: oracledb.Connection, params: MailsParams.create) {
    const query = insertQuery;
    const newItemQuery = getAddedItemQuery
    
    try {
        const result = await con.execute(query, params, {});

        const newItemData = await con.execute(newItemQuery, { lastRowid: result.lastRowid }, {});

        const newItemResult = Mail(newItemData.rows[0])
        
        return newItemResult

    } catch (error){
        throw(error);
    } 
}

const getById = async function (con: oracledb.Connection, params: MailsParams.getById) {
    const query = getByIdQuery;
    
    try {
        const data = await con.execute(query, params, {});

        if (data.rows.length == 0) {
            throw(new NotFoundError('mail not found'))
        } else {
            const result = Mail(data.rows[0])
            return result
        }
    } catch (error){
        throw(error);
    } 
}

const delById = async function (con: oracledb.Connection, params: MailsParams.getById) {
    const query = deleteByIdQuery;
    
    try {
        const result = await con.execute(query, params, {});

        if (result.rowsAffected == 0) {
            throw(new NotFoundError('mail not found'));
        } else {
            return result
        }
    } catch (error){
        throw(error);
    } 
}


export default {
    getAll,
    createItem,
    getById,
    delById
}