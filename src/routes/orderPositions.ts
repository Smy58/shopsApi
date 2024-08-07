import * as exp from 'express'
const router = exp.Router()


const {
    getAllOrderPosition, getOrderPositionById, delOrderPositionById, getNothing
} = require('../controllers/orderPositions');

router.get('/', getAllOrderPosition);
router.get('/:orderPositionId', getOrderPositionById);
router.delete('/:orderPositionId', delOrderPositionById);
router.get('/*', getNothing);
router.post('/*', getNothing);



module.exports = router;