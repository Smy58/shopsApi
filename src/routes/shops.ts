import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const { getAllShops, createShop, getShopById, delShopById } = require('../controllers/shops');

router.get('/', getAllShops);
router.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        address: Joi.string().min(2).max(30),
        workTimeStart: Joi.string().pattern(new RegExp('^([01][0-9]|2[0-3]):[0-5][0-9]$')),
        workTimeEnd: Joi.string().pattern(new RegExp('^([01][0-9]|2[0-3]):[0-5][0-9]$')),
        waitingTime: Joi.number().integer(),
        image: Joi.string(),
    }),
}), createShop);
router.get('/:shopId', getShopById);
router.delete('/:shopId', delShopById);



module.exports = router;