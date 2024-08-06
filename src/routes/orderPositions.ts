import * as exp from 'express'
const router = exp.Router()


const {
    getAllOrderPosition, getOrderPositionById, delOrderPositionById
} = require('../controllers/orderPositions');

router.get('/orderPositions', getAllOrderPosition);
router.get('/orderPositions/:orderPositionId', getOrderPositionById);
router.delete('/orderPositions/:orderPositionId', delOrderPositionById);



module.exports = router;