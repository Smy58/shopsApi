import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllRole, createRole, getRoleById, delRoleById
} = require('../controllers/roles');

router.get('/', getAllRole);
router.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30)
    }),
}), createRole);
router.get('/:roleId', getRoleById);
router.delete('/:roleId', delRoleById);



module.exports = router;