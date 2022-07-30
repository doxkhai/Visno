const moment = require('moment')

date = '2022-07-'
var start = moment(date+'01').utc().add(1,'days').startOf('day').toDate()
let end = moment(date+'31').utc().add(1,'days').endOf('day').toDate()
// var month = check.date()
// var month = 
console.log(start)
console.log(end)