const moment = require('moment')

year = 2022
month = 9
var start = (year, month) => moment(new Date(year, month - 1, 2)).utc().startOf('day').toDate()
let end = (year, month) => moment(new Date(year, month, 1)).utc().endOf('day').toDate()
// var check = moment(date).year()
// var month = check.date()
// var month = 
// console.log(start)
// console.log(end)
// for (let i = 1; i < 13; i++) {
//     console.log(`Thang ${i}`)
//     console.log(start(year, i))
//     console.log(end(year, i))
//     console.log('\n')
// }

date = '2022-01-01'
console.log(moment().month())
// console.log(d.utc())