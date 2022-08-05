const User = require('../models/User')
const Expense = require('../models/Expense')
const moment = require('moment')
const subfunc = require('../../util/subfunction')
const MonthlyExpense = require('../models/MonthlyExpense')

class ExpenseController {

    //*[GET] /expenses/?month=1&year=1
    async index(req, res, next) {

        // res.render('Expenses/expense')
        let year = req.query.year ? req.query.year : moment().year()
        let month = req.query.month ? req.query.month : moment().month() + 1

        //TODO: add user ID in to find query - done
        //TODO: add sort - done

        let exps = await Expense.getExpense(year, month, '62d27053ce114a13ea774103')

        res.json(exps)

    }

    //*[GET] /expenses/trash?month=1&year=1
    async trash(req, res, next) {

        // res.render('Expenses/expense')
        let year = req.query.year ? req.query.year : moment().year()
        let month = req.query.month ? req.query.month : moment().month() + 1

        //TODO: add user ID in to find query - done
        //TODO: add sort - done
        let exps = await Expense.getExpense(year, month, '62d27053ce114a13ea774103', true)

        res.json(exps)
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

    //*[POST] /expenses/store
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


    //*[POST] /expenses/mani
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

    //*[GET] /expenses/stat/?month=1&year=2
    async monthlyExpenses(req, res, next) {

        let year = req.query.year ? req.query.year : moment().year()
        let month = req.query.month ? req.query.month : moment().month() + 1

        //todo: add userID in to find query
        let exps = await Expense.getExpense(year, month, '62d27053ce114a13ea774103')

        let mEx = new MonthlyExpense(exps)

        res.json(mEx)
    }

    //*[PUT] /expenses/edit/:id?_method=PUT
    // {
    //     exName : "value",
    //     total: "value",
    //     category: "value",
    //     description: "value",
    //     date: "value"
    // }

    editExpense(req, res, next) {
        let update = req.body

        Expense.findOneAndUpdate({
            _id: req.params.id,
            // userID: req.user._id
        }, update, { new: true })
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

            let expenses = await Expense.getExpense(year, month,'62d27053ce114a13ea774103')

            if (expenses.length === 0) continue

            let mEx = new MonthlyExpense(expenses)

            obj["total"] += mEx.total
            for (const category in mEx.totalEach) {
                let each = obj["totalEach"][category]
                if (!each)
                    obj["totalEach"][category] = 0
                obj["totalEach"][category] += mEx["totalEach"][category]
            }

            obj["data"].push(mEx)
        }

        res.json(obj)
    }



}

module.exports = new ExpenseController()