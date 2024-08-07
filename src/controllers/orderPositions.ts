import db_query from '../dbconnection';
import OrderPosition from '../models/orderPosition';
import { NotFoundError } from '../errors/not-found-err'

import { orderPositionsQueryGet, getByIdQuery, deleteByIdQuery, paginationQuery } from '../queries/orderPositions'

const maxnumrows = 20;
let offset = 0;

module.exports.getAllOrderPosition = async function (req, res, next) {
    let query = orderPositionsQueryGet;

    if (req.query.page) {
        offset = (req.query.page - 1) * maxnumrows
    }

    const params: {[k: string]: any} = { offset, maxnumrows };

    if (req.query.orderId) {
        query += ` where order_id = :orderId`
        params.orderId = req.query.orderId
    }
    
    query += paginationQuery;
    
    const options = { prefetchRows: maxnumrows + 1, fetchArraySize: maxnumrows };
    
    const data = await db_query.exec(query, params, options);

    const result = data.rows.map(obj => {
        return OrderPosition(obj)
    })
    
    res.status(200).json(result);
};


module.exports.getOrderPositionById = async function (req, res, next) {
    const query = getByIdQuery;
    const params = { orderPositionId: req.params.orderPositionId};
    
    const data = await db_query.exec(query, params, {});

    
    if (data.rows.length == 0) {
        next(new NotFoundError('OrderPosition not found'))
    } else {
        const result = OrderPosition(data.rows[0])
        res.status(200).json(result);
    }
};

module.exports.delOrderPositionById = async function (req, res, next) {
    const query = deleteByIdQuery;
    const params = { orderPositionId: req.params.orderPositionId};
    
    
    const result = await db_query.exec(query, params, {});
    
    
    if (result.rowsAffected == 0) {

        next(new NotFoundError('OrderPosition not found'));

    } else {
        res.status(200).json({ message: `OrderPosition ${req.params.orderPositionId} deleted` });
    }
};


module.exports.getNothing = async function (req, res, next) {
    const e = new NotFoundError('Not Found');
    next(e);
}