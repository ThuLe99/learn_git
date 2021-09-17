import express from 'express'
import conversationCtrl from '../controllers/conversationCtrl'
import messageCtrl from '../controllers/messageCtrl'
import auth from '../middleware/auth'

const router = express.Router()

router.get('/conversation/userId',conversationCtrl.getConversation)

router.post('/conversation', conversationCtrl.createConversation)

router.get('/conversation/find/:firstUserId/:secondUserId',conversationCtrl.getConversationUser)


//message
router.post('/message', messageCtrl.createMessage)

router.get('/message/userId/:conversationId',messageCtrl.getMessage)

export default router;