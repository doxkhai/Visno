const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    pNumber: { type: String, minLength: 8 },
    dob: { type: Date },
    address: { type: String },
    category: [
        {
            _id: { type: Schema.Types.ObjectId, required: true, auto: true },
            value: { type: String, required: true }
        }
    ],
    friendlist: {
        type: [String],
    },
},
    { timestamps: true }
)

User.statics.getCategory = async function (id) {
    let res = []
    await this.findById(id)
        .then((user) => {
            res = user.category
        })
        .catch(err => { throw new Error(err) })
    return res
}

module.exports = mongoose.model('User', User)

// user: {
//     category [
//         {
//             id: 123
//             value: 'fo'
//         }
//     ]
// }

// expense : [
//     {
//         name: 'an sang'
//         category: 'fo'
//     }
// ]