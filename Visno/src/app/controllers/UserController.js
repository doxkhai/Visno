const User = require('../models/User')
const url = require('url')
class UserController {
    
    //* [GET] /
    index (req, res, next) {
        res.render('Site/home', {user : req.user})
    }

    //*[GET] /userinfo
    info(req, res, next) {
        res.render('User/userinfo', {
            user : req.user,
            message : req.query ? req.query.message : '',
            alert : req.query ? req.query.alert : ''
        })
    }

    //* [GET] /friends
    friend(req,res,next) {
        res.render('User/friendlist', {
            user: req.user,
        })
    }

   

    //* [GET] /search
    search(req,res,next) {
        
        let field = req.query.field
    
        if (field.includes('@')){
            User.findOne({email : field})
                .then((user) => {
                    res.json(user)
                })
                .catch(next)
        }
        else {
            User.find({name : { $regex: field, $options: 'i'}})
                .then((users) => {
                    res.json(users)
                })
                .catch(next)
        }
    }

    //* [GET] /edit-info
    editInfoGet (req, res, next) {
        res.render('User/edit-profile', {
            user: req.user,
            message : req.query ? req.query.message : '',
            alert : req.query ? req.query.alert : ''
        })
    }

    //* [POST] /edit-info
    editInfoPut (req, res, next) {
        // res.json(req.body)
        User.findOne({email : req.body.email})
            .then((user) => {
                

                //todo: Validate user found by email and user find by id are different people
                if(user && req.user.email !== req.body.email){
                    return res.redirect(url.format({
                        pathname: '/edit-info',
                        query: {
                            "message" : "Email existed",
                            "alert" : "warning"
                        }
                    }))
                }

                User.findByIdAndUpdate((req.body.id), {
                    name : req.body.name,
                    email : req.body.email,
                    dob : req.body.dob,
                    pNumber: req.body.pNumber,
                    address: req.body.address
                })
                    .then((user) => {
                        if(!user) res.send('error')
                        res.redirect(url.format({
                            pathname: '/userinfo',
                            query: {
                                "message" : "Updated successfully",
                                "alert" : "success"
                            }
                        }))
                    })
                    .catch(next)

            })
            .catch(next)
    }

}

module.exports = new UserController()