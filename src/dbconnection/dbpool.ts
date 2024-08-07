const oracledb = require('oracledb');

const dbConfig = {
    sysPool: {
        user:'sys',
        password:'user',
        connectionString:'localhost:1521/XEPDB1',
        privilege: oracledb.SYSDBA,
        poolMin: 10,
        poolMax: 10,
        poolIncrement: 0
    }
}

async function initialize() {
    try {
        console.log('creating pool');
        
        const pool = await oracledb.createPool(dbConfig.sysPool);

    } catch  (err){
        console.error(err.message);
    }
}

module.exports.initialize = initialize;
  