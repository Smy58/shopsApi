import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllStatus, createStatus, getStatusById, delStatusById
} = require('../controllers/statuses');

router.get('/', getAllStatus);
router.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30)
    }),
}), createStatus);
router.get('/:statusId', getStatusById);
router.delete('/:statusId', delStatusById);



module.exports = router;