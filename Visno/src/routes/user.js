const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/UserController')

router.get('/friends', userController.friend)
router.get('/', userController.index)


module.exports = router