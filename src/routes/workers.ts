import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllWorker, createWorker, getWorkerById, delWorkerById
} = require('../controllers/workers');

router.get('/', getAllWorker);
router.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        shopId: Joi.number().integer(),
        roleId: Joi.number().integer()
    }),
}), createWorker);
router.get('/:workerId', getWorkerById);
router.delete('/:workerId', delWorkerById);



module.exports = router;