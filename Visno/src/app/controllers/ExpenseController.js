const User = require('../models/User')
const Expense = require('../models/Expense')
const moExpense = require('../models/MonthlyExpense')
const moment = require('moment')
const subfunc = require('../../util/subfunction')

class ExpenseController {

    //[GET] /expenses/?month=1&year=1
    index(req, res, next) {
        // res.render('Expenses/expense')
        var date = moment().format('YYYY-MM-')

        if (req.query.year) {
            date = req.query.year + '-' + req.query.month + '-'
        }

        //TODO: add user ID in to find query
        Expense.find({
            date: {
                $gte: subfunc.startOfDay(date + '01'),
                $lte: subfunc.endOfDay(date + '31')
            },
            // userID: req.user._id
        })
            .then(expenses => {
                let obj = subfunc.multiMongooseToObj(expenses)
                res.json(obj)
            })
            .catch(next)
    }

    // [{   
    //     exName: name,
    //     total: value,
    //     category: enum value,
    //     description: des,
    //     date: datevalue
    // }, {
    //     ...
    // }]

    //[POST] /expenses/store
    storeExpenses(req, res, next) {
        var obj = JSON.parse(req.body.arr);

        // for (const exp of obj) {
        //     exp.userID = req.user._id
        // }

        Expense.insertMany(obj)
            .then((o) => {
                // res.redirect('/expenses')
                req.data = o
                res.json(o)
                next()
            })
            .catch(err => { throw err })
    }

    async storeMonthlyExpenses(req, res, next) {


        for (const exp of req.data) {

            let date = moment(exp["date"]).format('YYYY-MM-')
            date += '15'

            await moExpense.findOne({
                month: {
                    $gte: subfunc.startOfDay(date),
                    $lte: subfunc.endOfDay(date)
                },
                // userID: req.user._id
            })
                .then(async (m) => {

                    // if monthly expenses not created yet  
                    if (!m) {
                        let monthEx = new moExpense({
                            month: date,
                            userID: exp["userID"],
                            totalEach: {}
                        })

                        monthEx.totalEach.set(exp["category"], exp["total"])

                        await monthEx.save()
                    }

                    //if monthly expenses existed
                    else {

                        const category = m.totalEach.get(exp["category"])
                        if (category) {
                            m.totalEach.set(exp["category"], category + exp["total"])
                        }
                        else {
                            m.totalEach.set(exp["category"], exp["total"])
                        }

                        await m.save()
                    }
                })
                .catch(next)
        }

    }

    //[GET] /expenses/stat/?month=1&year=2
    monthlyExpenses(req, res, next) {
        if (!req.query.year || !req.query.month) return res.redirect('back')

        var date = req.query.year + '-' + req.query.month + '-15'

        //todo: add userID in to find query
        moExpense.findOne({
            month: {
                $gte: subfunc.startOfDay(date),
                $lte: subfunc.endOfDay(date)
            },
            // userID: req.user._id
        })
            .then(m => {
                res.json(m)
            })
            .catch(next)
    }
}

module.exports = new ExpenseController()