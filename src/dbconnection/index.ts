const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

let connection = undefined;

const exec =  async function db_query(query,params) {
    
    if( connection === undefined ){
        console.log('Connecting...');

        connection = await oracledb.getConnection({
            user:'sys',
            password:'user',
            connectionString:'localhost:1521/XEPDB1',
            privilege: oracledb.SYSDBA
        });
        console.log('Connection was successful!');
    }
    try{
        let result = await connection.execute(query,params);
        
        return result;
    }catch (error){
        console.log(error);
    }
}

const execMany =  async function db_query(query, params, options) {
    
    if( connection === undefined ){
        console.log('Connecting...');

        connection = await oracledb.getConnection({
            user:'sys',
            password:'user',
            connectionString:'localhost:1521/XEPDB1',
            privilege: oracledb.SYSDBA
        });
        console.log('Connection was successful!');
    }
    try{
        let result = await connection.executeMany(query, params, options);
        
        return result;
    }catch (error){
        console.log(error);
    }
}

export default {
    exec,
    execMany
}