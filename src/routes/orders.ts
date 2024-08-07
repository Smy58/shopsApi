import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllOrder, createOrder, getOrderById, delOrderById, getPositionsByOrderId
} = require('../controllers/orders');

router.get('/', getAllOrder);
router.post('/', celebrate({
    body: Joi.object().keys({
        totalCost: Joi.number().integer(),
        shopId: Joi.number().integer(),
        statusId: Joi.number().integer(),
        deliveryId: Joi.number().integer(),
        clientId: Joi.number().integer(),
        positions: Joi.array().items(
            Joi.object().keys({
                positionId: Joi.number().integer(),
                count: Joi.number().integer(),
            })
        )
    }),
}), createOrder);
router.get('/:orderId', getOrderById);
router.delete('/:orderId', delOrderById);
router.get('/:orderId/positions', getPositionsByOrderId);



module.exports = router;