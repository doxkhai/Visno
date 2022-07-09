const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: {type: String, required: true},
    password : {type:String, required: true},
    email : {type: String, required: true},
    image: {type: String},
    pNumber : {type: Number},
    dob : {type: Date},
    category: [
        {type: String}
    ],
    friendlist: [
        {type: String}
    ],
    createdAt: {type: Date, default: Date.now()},
})

module.exports = mongoose.model('User', User)