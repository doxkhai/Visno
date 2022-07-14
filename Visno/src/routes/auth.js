var express = require('express')
const router = express.Router()
const authController = require('../app/controllers/AuthController')
const middlewareController = require('../app/controllers/MiddlewareController')

router.get('/login', authController.login)
router.post('/login', authController.signin)
router.post('/signup', authController.register)
router.get('/signup', authController.signup)
router.use(middlewareController.verifyToken)
router.get('/logout', authController.logout)

module.exports = router