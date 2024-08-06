import db_query from '../dbconnection';
import Role from '../models/role';

import { rolesQueryGet } from '../queries/roles'


const getQuery = rolesQueryGet

module.exports.getAllRole = async function (req, res, next) {
    let query = getQuery;
    
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Role(obj)
    })
    
    res.status(200).json(result);
};

module.exports.createRole = async function (req, res, next) {
    const {
        name
    } = req.body;

    const query = `insert into role (name) values 
('${name}')`;
    
    const params = [];
    
    const result = await db_query.exec(query,params);
    
    if (result?.lastRowid) {
        const newItemQuery = getQuery + ` where rl.rowid = '${result.lastRowid}'`
        const newItemData = await db_query.exec(newItemQuery,[]);

        const newItemResult = newItemData.rows.map(obj => {
            return Role(obj)
        })
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getRoleById = async function (req, res, next) {
    const query = getQuery + ` where rl.id = ${req.params.roleId}`;
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Role(obj)
    })
    
    
    res.status(200).json(result);
};

module.exports.delRoleById = async function (req, res, next) {
    const query = `delete from role where id = ${req.params.roleId}`;
    const params = [];
    
    
    const result = await db_query.exec(query,params);
    
    
    res.status(200).json({ message: "deleted" });
};