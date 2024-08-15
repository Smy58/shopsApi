import { NotFoundError } from "../../errors/not-found-err";
import { UnauthorizedError } from "../../errors/unauthorized-err";
import ClientModels from "../../models/client";
import { clientLoginQueryGet, clientsQueryGet, deleteByIdQuery, getAddedItemQuery, getByIdQuery, getPassByIdQuery, insertQuery, paginationQuery, updatePasswordQuery, updateQuery } from "../../queries/clients";

import oracledb from 'oracledb'
import { ClientParams } from '../../types/params'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


const getAll = async function (con: oracledb.Connection, params: ClientParams.getAll, page: number) {
    let query = clientsQueryGet;
    
    query += paginationQuery;
    
    if (page) {
        params.offset = (page - 1) * params.maxnumrows
    }
    
    const options = { prefetchRows: params.maxnumrows + 1, fetchArraySize: params.maxnumrows };
    
    try {
        const data = await con.execute(query,params, options);
        const result = data.rows.map(obj => {
            return ClientModels.Client(obj)
        })

        return result
    } catch (error){
        throw (error);
    } 
}

const createItem = async function (con: oracledb.Connection, params: ClientParams.create) {
    const query = insertQuery;
    const newItemQuery = getAddedItemQuery
    
    try {
        params.password = await bcrypt.hash(params.password, 7)

        console.log(query);
        console.log(params);
        
        const result = await con.execute(query, params, {});

        console.log('ADDED');
        
        
        const newItemData = await con.execute(newItemQuery, { lastRowid: result.lastRowid }, {});

        const newItemResult = ClientModels.Client(newItemData.rows[0])
        
        return newItemResult
        

    } catch (error){
        throw(error);
    } 
}

const updateItem = async function (con: oracledb.Connection, params: ClientParams.updateById) {
    let query = updateQuery;

    try {
        console.log(query);
        console.log(params);
        const data = await con.execute(query, params, {});
        console.log(data);
        

        if (data.rowsAffected == 0) {
            throw(new NotFoundError('Client not found'))
        } else {
            let query = getByIdQuery

            console.log(query);
            console.log({ clientId: params.clientId });
            
            
            const data = await con.execute(query, { clientId: params.clientId }, {});

            if (data.rows.length == 0) {
                throw(new NotFoundError('Client not found'))
            } else {
                const result = ClientModels.Client(data.rows[0])
                return result
            }
        }
    } catch (error){
        throw(error);
    } 
}

const updatePassword = async function (con: oracledb.Connection, params: ClientParams.updatePasswordById) {
    let query = getPassByIdQuery;

    try {
        console.log(query);
        console.log(params);
        const data = await con.execute(query, { clientId: params.clientId }, {});

        if (data.rows.length == 0) {
            throw(new NotFoundError('Client not found'))
        } else {

            const client = ClientModels.ClientLogin(data.rows[0])

            console.log(client);
            
            if (params.password != client.password && !bcrypt.compare(params.oldPassword, client.password)) {
                throw(new UnauthorizedError('Incorrect password'))
            } else {
                let query = updatePasswordQuery
                params.newPassword = await bcrypt.hash(params.newPassword, 7)

                console.log(query);
                console.log(params);

                const newParams = {
                    clientId: params.clientId,
                    newPassword: params.newPassword
                }
                
                const dataChange = await con.execute(query, newParams, {});

                console.log(dataChange);
                
                if (dataChange.rowsAffected == 0) {
                    throw(new NotFoundError('Client not found'));
                } else {
                    return dataChange
                }
            }      
            
        }
    } catch (error){
        throw(error);
    } 
}

const getById = async function (con: oracledb.Connection, params: ClientParams.getById) {
    const query = getByIdQuery;
    
    try {
        console.log(query);
        console.log(params);
        
        const data = await con.execute(query, params, {});

        if (data.rows.length == 0) {
            throw(new NotFoundError('Client not found'))
        } else {
            const result = ClientModels.Client(data.rows[0])
            return result
        }
    } catch (error){
        throw(error);
    } 
}

const delById = async function (con: oracledb.Connection, params: ClientParams.getById) {
    const query = deleteByIdQuery;
    
    try {
        const result = await con.execute(query, params, {});

        if (result.rowsAffected == 0) {
            throw(new NotFoundError('Client not found'));
        } else {
            return result
        }
    } catch (error){
        throw(error);
    } 
}

const login = async function(con: oracledb.Connection, params: ClientParams.login) {
    let query = clientLoginQueryGet + ' where phone = :login';    

    try {
        let data = await con.execute(query, { login: params.login });
        
        if (data.rows.length == 0) {
            query = clientLoginQueryGet + ' where mail = :login'

            data = await con.execute(query, { login: params.login });

            if (data.rows.length == 0) {
                throw(new NotFoundError('Client not found'))
            }
        }

        const result = ClientModels.ClientLogin(data.rows[0])

        
        if (params.password != result.password && !bcrypt.compare(params.password, result.password)) {
            throw(new UnauthorizedError('Incorrect password'))
        }

        const client = ClientModels.Client(data.rows[0])

        const token = jwt.sign({ id: result.id }, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'some-secret-key', { expiresIn: '7d' })

        return client
    } catch (error){
        throw (error);
    } 
}


export default {
    getAll,
    createItem,
    getById,
    delById,
    login,
    updateItem,
    updatePassword
}