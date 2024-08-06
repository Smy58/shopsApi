import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllClient, createClient, getClientById, delClientById
} = require('../controllers/clients');

router.get('/clients', getAllClient);
router.post('/clients', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        address: Joi.string(),
        phone: Joi.string(),
        mail: Joi.string()
    }),
}), createClient);
router.get('/clients/:clientId', getClientById);
router.delete('/clients/:clientId', delClientById);



module.exports = router;