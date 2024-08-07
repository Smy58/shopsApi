import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllGroup, createGroup, getGroupById, delGroupById
} = require('../controllers/groups');

router.get('/', getAllGroup);
router.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30)
    }),
}), createGroup);
router.get('/:groupId', getGroupById);
router.delete('/:groupId', delGroupById);



module.exports = router;