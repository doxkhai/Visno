const User = require('../models/User')

class UserController {
    
    //* [GET] /
    index (req, res, next) {
        res.render('Site/home', {user : req.user})
    }

    //*[GET] /userinfo
    info(req, res, next) {
        
        res.render('User/userinfo')
    }

    //* [GET] /friends
    friend(req,res,next) {
        res.render('User/friendlist')
    }

}

module.exports = new UserController()