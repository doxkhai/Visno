const User = require('../models/User')

class UserController {
    
    //* [GET] /
    index (req, res, next) {
        res.render('Site/home', {user : req.user})
    }

    //*[GET] /userinfo
    info(req, res, next) {
        res.render('User/userinfo', {user : req.user})
    }

    //* [GET] /friends
    friend(req,res,next) {
        res.render('User/friendlist', {
            user: req.user,
        })
    }

}

module.exports = new UserController()