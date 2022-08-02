
const moment = require('moment')

module.exports = {
    multiMongooseToObj: mArray => {
        return mArray.map(m => m.toObject())
    },

    mongooseToObj: m => {
        return m.toObject()
    },

    startOfDay: date => {
        return moment(date).utc().add(1, 'days').startOf('day').toDate()
    },

    endOfDay: date => {
        return moment(date).utc().add(1, 'days').endOf('day').toDate()
    },

    startOfMonth: (year, month) => {
        return moment(new Date(year, month - 1, 2)).utc().startOf('day').toDate()
    },

    endOfMonth: (year, month) => {
        return moment(new Date(year, month, 1)).utc().endOf('day').toDate()
    }

}