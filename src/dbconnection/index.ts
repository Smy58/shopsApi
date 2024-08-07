const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;


const exec =  async function (query, params, options) {
    let con = undefined
    try{
        con = await oracledb.getConnection();
        let result = await con.execute(query,params, options);
        
        return result;
    } catch (error){
        console.log(error);
    } finally {
        if (con) {
            try {
                await con.close();
            } catch (err) {
                throw (err);
            }
        }
    }
}

const execMany =  async function (query, params, options) {
    let con = undefined
    try{
        con = await oracledb.getConnection();
        let result = await con.executeMany(query, params, options);
        
        return result;
    }catch (error){
        console.log(error);
    }
}

export default {
    exec,
    execMany
}