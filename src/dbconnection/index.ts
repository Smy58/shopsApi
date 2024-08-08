import oracledb from 'oracledb';
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;


const getCon = async function () {
    let con: oracledb.Connection = undefined
    try{
        con = await oracledb.getConnection();
        return con;
    } catch (error){
        console.log(error);
    }
}

export default {
    getCon
}