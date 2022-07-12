const authRouter = require('./auth')
const userRouter = require('./user')
const expenseRouter = require('./expense')
const middlewareController = require('../app/controllers/MiddlewareController')

function route(app){
    app.use(middlewareController.setUser)
    app.use('/auth', authRouter)
    app.use(middlewareController.requireLogin)
    app.use('/expenses', expenseRouter)
    app.use('/', userRouter)

}

module.exports = route;