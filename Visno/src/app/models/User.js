const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: {type: String},
    password : {type:String},
    email : {type: String},
    createdAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model('User', User)