const User = require('../models/User')

class HomeController {

    //* [GET] /
    index (req, res, next) {
        res.render('Site/home')
    }

    //* [GET] /login
    login (req,res,next) {
        res.render('Site/signin')
    }

    //* [GET] /signup
    signup (req,res,next) {
        res.render('Site/signup')
    }
}

module.exports = new HomeController();