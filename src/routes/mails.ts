import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllMail, createMail, getMailById, delMailById
} = require('../controllers/mails');

router.get('/mails', getAllMail);
router.post('/mails', celebrate({
    body: Joi.object().keys({
        mail: Joi.string().min(2).max(30),
        workerId: Joi.number().integer()
    }),
}), createMail);
router.get('/mails/:mailId', getMailById);
router.delete('/mails/:mailId', delMailById);



module.exports = router;