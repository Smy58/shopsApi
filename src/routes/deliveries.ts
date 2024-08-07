import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllDelivery, createDelivery, getDeliveryById, delDeliveryById
} = require('../controllers/deliveries');

router.get('/', getAllDelivery);
router.post('/', celebrate({
    body: Joi.object().keys({
        workerId: Joi.number().integer()
    }),
}), createDelivery);
router.get('/:deliveryId', getDeliveryById);
router.delete('/:deliveryId', delDeliveryById);



module.exports = router;