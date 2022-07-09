const User = require('../models/User')
const Expense = require('../models/Expense')
const moExpense = require('../models/MonthlyExpense')

class ExpenseController {
    //[GET] /expenses
    index(req, res, next) {
        res.render('Expenses/expense')
    }
}

module.exports = new ExpenseController()