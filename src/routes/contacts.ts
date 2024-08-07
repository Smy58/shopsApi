import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllContact, createContact, getContactById, delContactById
} = require('../controllers/contacts');

router.get('/', getAllContact);
router.post('/', celebrate({
    body: Joi.object().keys({
        phone: Joi.string().min(2).max(30),
        workerId: Joi.number().integer()
    }),
}), createContact);
router.get('/:contactId', getContactById);
router.delete('/:contactId', delContactById);



module.exports = router;