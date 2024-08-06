import db_query from '../dbconnection';
import Group from '../models/group';

import { groupsQueryGet } from '../queries/groups'

const getQuery = groupsQueryGet

module.exports.getAllGroup = async function (req, res, next) {
    let query = getQuery;
    
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Group(obj)
    })
    
    
    res.status(200).json(result);
};

module.exports.createGroup = async function (req, res, next) {
    const {
        name
    } = req.body;

    const query = `insert into "group" (name) values 
('${name}')`;
    
    const params = [];
    
    const result = await db_query.exec(query,params);
    
    if (result?.lastRowid) {
        const newItemQuery = getQuery + ` where rowid = '${result.lastRowid}'`
        const newItemData = await db_query.exec(newItemQuery,[]);

        
        const newItemResult = newItemData.rows.map(obj => {
            return Group(obj)
        })
        
        res.status(200).json(newItemResult);

    } else {
        res.status(501).json({});
    }
};


module.exports.getGroupById = async function (req, res, next) {
    const query = getQuery + ` where id = ${req.params.groupId}`;
    const params = [];
    
    const data = await db_query.exec(query,params);

    const result = data.rows.map(obj => {
        return Group(obj)
    })
    
    res.status(200).json(result);
};

module.exports.delGroupById = async function (req, res, next) {
    const query = `delete from "group" where id = ${req.params.groupId}`;
    const params = [];
    
    
    const result = await db_query.exec(query,params);
    
    
    res.status(200).json({ message: "deleted" });
};