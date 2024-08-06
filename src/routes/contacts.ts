import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllContact, createContact, getContactById, delContactById
} = require('../controllers/contacts');

router.get('/contacts', getAllContact);
router.post('/contacts', celebrate({
    body: Joi.object().keys({
        phone: Joi.string().min(2).max(30),
        workerId: Joi.number().integer()
    }),
}), createContact);
router.get('/contacts/:contactId', getContactById);
router.delete('/contacts/:contactId', delContactById);



module.exports = router;