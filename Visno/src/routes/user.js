const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/UserController')

router.get('/friends', userController.friend)
router.get('/userinfo', userController.info)
router.get('/', userController.index)


module.exports = router
