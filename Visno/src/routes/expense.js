var express = require('express')
const router = express.Router()
const expController = require('../app/controllers/ExpenseController')

router.get('/', expController.index)

module.exports = router