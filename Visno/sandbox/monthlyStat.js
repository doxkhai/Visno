// async storeMonthlyExpenses(req, res, next) {


    //     for (const exp of req.data) {

    //         let date = moment(exp["date"]).format('YYYY-MM-')
    //         date += '15'

    //         await moExpense.findOne({
    //             month: {
    //                 $gte: subfunc.startOfDay(date),
    //                 $lte: subfunc.endOfDay(date)
    //             },
    //             // userID: req.user._id
    //         })
    //             .then(async (m) => {

    //                 // if monthly expenses not created yet
    //                 if (!m) {
    //                     let monthEx = new moExpense({
    //                         month: date,
    //                         userID: exp["userID"],
    //                         totalEach: {}
    //                     })

    //                     monthEx.totalEach.set(exp["category"], exp["total"])

    //                     await monthEx.save()
    //                 }

    //                 //if monthly expenses existed
    //                 else {

    //                     const category = m.totalEach.get(exp["category"])
    //                     if (category) {
    //                         m.totalEach.set(exp["category"], category + exp["total"])
    //                     }
    //                     else {
    //                         m.totalEach.set(exp["category"], exp["total"])
    //                     }

    //                     await m.save()
    //                 }
    //             })
    //             .catch(next)
    //     }

    // }