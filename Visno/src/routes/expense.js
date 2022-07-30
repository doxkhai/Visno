var express = require('express')
const router = express.Router()
const expController = require('../app/controllers/ExpenseController')

router.get('/stat', expController.monthlyExpenses)
router.post('/store', expController.storeExpenses, expController.storeMonthlyExpenses)
router.get('/', expController.index)

module.exports = router
