const User = require('../models/User')

class UserController {
    
    //*[GET] /user/
    index(req, res, next) {
        
        res.render('User/userinfo')
    }

    //* [GET] /user/friends
    friend(req,res,next) {
        res.render('User/friendlist')
    }

}

module.exports = new UserController()