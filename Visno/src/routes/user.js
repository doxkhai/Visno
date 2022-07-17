const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/UserController')

router.get('/friends', userController.friend)
router.post('/edit-info', userController.editInfoPut)
router.get('/edit-info', userController.editInfoGet)
router.get('/userinfo', userController.info)
router.get('/search', userController.search)
router.get('/', userController.index)


module.exports = router
