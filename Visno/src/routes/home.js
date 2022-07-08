var express = require('express')
const router = express.Router()
const homeController = require('../app/controllers/HomeController')

router.use('/login', homeController.login)
router.use('/', homeController.index)

module.exports = router