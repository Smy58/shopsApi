import * as exp from 'express'
const router = exp.Router()

import { celebrate, Joi } from 'celebrate';


const {
    getAllGroup, createGroup, getGroupById, delGroupById
} = require('../controllers/groups');

router.get('/groups', getAllGroup);
router.post('/groups', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30)
    }),
}), createGroup);
router.get('/groups/:groupId', getGroupById);
router.delete('/groups/:groupId', delGroupById);



module.exports = router;