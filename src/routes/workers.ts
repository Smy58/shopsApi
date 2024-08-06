import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllWorker, createWorker, getWorkerById, delWorkerById
} = require('../controllers/workers');

router.get('/workers', getAllWorker);
router.post('/workers', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        shopId: Joi.number().integer(),
        roleId: Joi.number().integer()
    }),
}), createWorker);
router.get('/workers/:workerId', getWorkerById);
router.delete('/workers/:workerId', delWorkerById);



module.exports = router;