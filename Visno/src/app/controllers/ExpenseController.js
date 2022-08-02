const User = require('../models/User')
const Expense = require('../models/Expense')
// const moExpense = require('../models/MonthlyExpense')
const moment = require('moment')
const subfunc = require('../../util/subfunction')
const MonthlyExpense = require('../models/MonthlyExpense')

class ExpenseController {

    //[GET] /expenses/?month=1&year=1
    index(req, res, next) {
        // res.render('Expenses/expense')
        let year = req.query.year ? req.query.year : moment().year()
        let month = req.query.month ? req.query.month : moment().month() + 1

        //TODO: add user ID in to find query
        //TODO: add sort 
        Expense.find({
            date: {
                $gte: subfunc.startOfMonth(year, month),
                $lte: subfunc.endOfMonth(year, month)
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

                res.json(o)
            })
            .catch(next)
    }


    //softdelete, forcedelete, restore
    // {
    //     action: delete || force || restore,
    //     arr : '["id1","id2",...]'
    // }
    expensesMani(req, res, next) {
        const obj = JSON.parse(req.body.arr)

        const query = {
            _id: { $in: obj },
            // userID: req.user._id
        }

        switch (req.body.action) {
            case 'delete':
                Expense.delete(query)
                    .then(() => {
                        res.redirect('back')
                    })
                    .catch(next)
                break
            case 'force':
                Expense.deleteOne(query)
                    .then(() => {
                        res.redirect('back')
                    })
                    .catch(next)
                break
            case 'restore':
                Expense.restore(query)
                    .then(() => {
                        res.redirect('back')
                    })
                    .catch(next)
                break
            default:
                res.status(400).send('Invalid Action')
        }
    }

    //[GET] /expenses/stat/?month=1&year=2
    monthlyExpenses(req, res, next) {

        let year = req.query.year ? req.query.year : moment().year()
        let month = req.query.month ? req.query.month : moment().month() + 1

        //todo: add userID in to find query
        Expense.find({
            date: {
                $gte: subfunc.startOfMonth(year, month),
                $lte: subfunc.endOfMonth(year, month)
            },
            // userID: req.user._id
        })
            .then(expenses => {
                const mEx = new MonthlyExpense(subfunc.multiMongooseToObj(expenses))

                res.json(mEx)
            })
            .catch(next)
    }

    //[PUT] /expenses/edit/:id?_method=PUT
    // {
    //     exName : "value",
    //     total: "value",
    //     category: "value",
    //     description: "value",
    //     date: "value"
    // }

    editExpense(req, res, next) {
        let update = req.body
        // update.userID = req.user._id
        Expense.findByIdAndUpdate(req.params.id, update, { new: true })
            .then((e) => { res.json(e) })
            .catch(next)
    }

    //[GET] /expense/yearlystat?year=1
    async yearlyStat(req, res, next) {

        let year = req.query.year ? req.query.year : moment().year()

        let obj = {
            total: 0,
            totalEach: {},
            year: year,
            data: []
        }

        for (let month = 1; month < 13; month++) {
            await Expense.find({
                date: {
                    $gte: subfunc.startOfMonth(year, month),
                    $lte: subfunc.endOfMonth(year, month)
                },
                // userID: req.user._id
            })
                .then(expenses => {
                    if (expenses.length === 0) return

                    let mEx = new MonthlyExpense(subfunc.multiMongooseToObj(expenses))

                    obj["total"] += mEx.total
                    for (const category in mEx.totalEach) {
                        let each = obj["totalEach"][category]
                        if (!each)
                            obj["totalEach"][category] = 0
                        obj["totalEach"][category] += mEx["totalEach"][category]
                    }

                    obj["data"].push(mEx)

                })
                .catch(next)
        }

        res.json(obj)
    }




}

module.exports = new ExpenseController()