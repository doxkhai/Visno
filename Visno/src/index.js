const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()

app.get('/', (req,res,next) => {
    res.json({"message" : "hello"})
})

app.listen(process.env.PORT, () => console.log(`App listening at port : ${process.env.PORT}`))