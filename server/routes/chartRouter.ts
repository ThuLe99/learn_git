import express from 'express'
import chartCtrl from '../controllers/chartCtrl'
import auth from '../middleware/auth'

const router = express.Router()

router.route('/chart')
  .post( chartCtrl.staticialBlogsWithMonth)



export default router;