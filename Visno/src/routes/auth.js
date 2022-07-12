var express = require('express')
const router = express.Router()
const authController = require('../app/controllers/AuthController')
const middlewareController = require('../app/controllers/MiddlewareController')

router.get('/logout', authController.logout)
router.post('/login', authController.signin, middlewareController.verifyToken)
router.get('/login', authController.login)
router.post('/signup', authController.register)
router.get('/signup', authController.signup)

module.exports = router