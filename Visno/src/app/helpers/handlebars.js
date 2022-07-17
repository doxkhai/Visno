// const handlebars = require('express-handlebars')
const moment = require('moment')

module.exports = {
    toDateInput : (date) => {
        return moment(date).format('YYYY-MM-DD');
    },
    toDateString : (date) => {
        return moment(date).format('DD-MM-YYYY');
    }
}