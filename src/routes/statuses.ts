import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllStatus, createStatus, getStatusById, delStatusById
} = require('../controllers/statuses');

router.get('/statuses', getAllStatus);
router.post('/statuses', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30)
    }),
}), createStatus);
router.get('/statuses/:statusId', getStatusById);
router.delete('/statuses/:statusId', delStatusById);



module.exports = router;