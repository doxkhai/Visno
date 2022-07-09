const homeRouter = require('./home')
const userRouter = require('./user')
const expenseRouter = require('./expense')

function route(app){
    
    app.use('/expenses', expenseRouter)
    app.use('/user', userRouter)
    app.use('/', homeRouter)

}

module.exports = route;