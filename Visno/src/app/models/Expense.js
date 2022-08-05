const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema
const User = require('./User')
const subfunc = require('../../util/subfunction')

const Expense = new Schema({
    exName: { type: String, required: true },
    exType: {
        type: String,
        enum: ['expense', 'income'], 
        default: 'expense'
    },
    userID: { type: String, required: true },
    total: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now() },
}, { timestamps: true })

Expense.plugin(mongoose_delete, {
    // overrideMethods: 'all',
    deletedAt: true
});

Expense.statics.getExpense = async function (year, month, userid, deleted = false) {
    let res = []
    await this.find({
        date: {
            $gte: subfunc.startOfMonth(year, month),
            $lte: subfunc.endOfMonth(year, month)
        },
        deleted: deleted,
        // userID: userid
    })
        .sort({ date: 1 })
        .then(async (expenses) => {
            let exps = subfunc.multiMongooseToObj(expenses)

            //TODO: add userID in to query
            let cat = await User.getCategory(userid)

            let map = subfunc.arrayToMap(cat)
            for (const exp of exps) {
                let key = exp["category"]
                if (key in map) {
                    exp["category"] = map[key]
                }
                else {
                    exp["category"] = ''
                }
            }

            res = exps

        })
        .catch((err) => {throw new Error(err)}) 
    
    return res
}

module.exports = mongoose.model('Expense', Expense)