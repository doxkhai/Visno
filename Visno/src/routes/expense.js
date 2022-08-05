var express = require('express')
const router = express.Router()
const expController = require('../app/controllers/ExpenseController')

router.get('/stat', expController.monthlyExpenses)
router.post('/mani', expController.expensesMani)
router.post('/store', expController.storeExpenses)
router.put('/edit/:id', expController.editExpense)
router.get('/yearlystat', expController.yearlyStat)
router.get('/trash', expController.trash)
router.get('/', expController.index)

module.exports = router
