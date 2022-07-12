const homeRouter = require('./home')
const userRouter = require('./user')
const expenseRouter = require('./expense')
const setUser = require('../app/controllers/MiddlewareController').setUser

function route(app){
    app.use(setUser)
    app.use('/expenses', expenseRouter)
    app.use('/user', userRouter)
    app.use('/', homeRouter)

}

module.exports = route;