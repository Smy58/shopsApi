import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllShopProduct, createShopProducts, getShopProductById, delShopProductById
} = require('../controllers/shopProducts');

router.get('/shopProducts', getAllShopProduct);
router.post('/shopProducts', celebrate({
    body: Joi.object().keys({
        shopId: Joi.number().integer(),
        productId: Joi.number().integer(),
        cost: Joi.number().integer()
    }),
}), createShopProducts);
router.get('/shopProducts/:shopProductId', getShopProductById);
router.delete('/shopProducts/:shopProductId', delShopProductById);



module.exports = router;