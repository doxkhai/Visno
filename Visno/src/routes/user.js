const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/UserController')

router.get('/friends', userController.friend)
router.post('/edit-info', userController.editInfoPut)
router.get('/edit-info', userController.editInfoGet)
router.get('/userinfo', userController.info)
router.get('/search', userController.search)
router.post('/category/add', userController.addCategory)
router.put('/category/edit/:id', userController.editCategory)
router.get('/', userController.index)


module.exports = router
