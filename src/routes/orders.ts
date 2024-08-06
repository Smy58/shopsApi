import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllOrder, createOrder, getOrderById, delOrderById, getPositionsByOrderId
} = require('../controllers/orders');

router.get('/orders', getAllOrder);
router.post('/orders', celebrate({
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
router.get('/orders/:orderId', getOrderById);
router.delete('/orders/:orderId', delOrderById);
router.get('/orders/:orderId/positions', getPositionsByOrderId);



module.exports = router;