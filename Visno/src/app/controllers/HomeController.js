const User = require('../models/User')

class HomeController {

    //* [GET] /
    index (req, res, next) {
        // User.find({},(err, users) => {
        //     if(!err){
        //         res.json(users)
        //         console.log(users[0]._id)
        //     }
        //     else{
        //         res.status(400).json({error: 'error!!!'})
        //     }
        // })
        res.render('home')
    }

    //* [GET] /login
    login (req,res,next) {
        res.render('signin')
    }
}

module.exports = new HomeController();