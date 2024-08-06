import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllDelivery, createDelivery, getDeliveryById, delDeliveryById
} = require('../controllers/deliveries');

router.get('/deliveries', getAllDelivery);
router.post('/deliveries', celebrate({
    body: Joi.object().keys({
        workerId: Joi.number().integer()
    }),
}), createDelivery);
router.get('/deliveries/:deliveryId', getDeliveryById);
router.delete('/deliveries/:deliveryId', delDeliveryById);



module.exports = router;