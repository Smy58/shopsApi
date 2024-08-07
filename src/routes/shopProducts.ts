import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllShopProduct, createShopProducts, getShopProductById, delShopProductById
} = require('../controllers/shopProducts');

router.get('/', getAllShopProduct);
router.post('/', celebrate({
    body: Joi.object().keys({
        shopId: Joi.number().integer(),
        productId: Joi.number().integer(),
        cost: Joi.number().integer()
    }),
}), createShopProducts);
router.get('/:shopProductId', getShopProductById);
router.delete('/:shopProductId', delShopProductById);



module.exports = router;