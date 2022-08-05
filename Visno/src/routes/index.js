const authRouter = require('./auth')
const userRouter = require('./user')
const expenseRouter = require('./expense')
const mC = require('../app/controllers/MiddlewareController')

function route(app){
    app.use('/auth', authRouter)
    app.use(mC.setUser ,mC.requireLogin, mC.verifyToken)
    app.use('/expenses', expenseRouter)
    app.use('/', userRouter)
    app.all('*', mC.badRequest)
    app.use(mC.errorHandler)
}

module.exports = route;