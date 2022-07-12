var express = require('express')
const router = express.Router()
const homeController = require('../app/controllers/HomeController')
const middlewareController = require('../app/controllers/MiddlewareController')

router.post('/login', homeController.signin, middlewareController.verifyToken)
router.get('/login', homeController.login)
router.post('/signup', homeController.register)
router.get('/signup', homeController.signup)
router.get('/', homeController.index)

module.exports = router