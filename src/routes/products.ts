import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllProducts, createProduct, getProductById, delProductById
} = require('../controllers/products');

router.get('/products', getAllProducts);
router.post('/products', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        description: Joi.string(),
        vendorCost: Joi.number().integer(),
        image: Joi.string(),
        groupId: Joi.number().integer(),
    }),
}), createProduct);
router.get('/products/:productId', getProductById);
router.delete('/products/:productId', delProductById);



module.exports = router;