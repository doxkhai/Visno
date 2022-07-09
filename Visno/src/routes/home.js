var express = require('express')
const router = express.Router()
const homeController = require('../app/controllers/HomeController')

router.get('/login', homeController.login)
router.get('/signup', homeController.signup)
router.get('/', homeController.index)

module.exports = router