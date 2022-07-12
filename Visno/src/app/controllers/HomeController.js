const url = require('url')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const User = require('../models/User')

class HomeController {

    //* [GET] /
    index (req, res, next) {
        res.render('Site/home', {user : req.user})
    }

    //* [GET] /login
    login (req,res,next) {
        let o = req.query ? {
            message: req.query.message,
            alert: req.query.alert
        } : {}
        o.noheader = true
        res.render('Site/signin', o)
    }

    //* [POST] /login
    signin (req, res, next){
        User.findOne({email: req.body.email})
            .then((user) => {
                const failUrl = url.format({
                        pathname: '/login',
                        query: {
                            'message': 'Wrong email or password',
                            'alert':'danger'
                        }
                    })

                if(!user) return res.redirect(failUrl)
                
                bcrypt.compare(
                    req.body.password,
                    user.password
                )
                      .then((validPsw) => {
                          if(!validPsw) return res.redirect(failUrl)
                        
                          //* Successfully login
                          const accessToken = jwt.sign({
                              id: user._id,   
                          },
                          process.env.JWT_ACCESS_KEY,
                          { expiresIn: "30s" }
                          )
                          req.headers.token = 'Bearer ' + accessToken

                          next()
                      })
                      .catch(next)
            })
            .catch(next)
    }

    //* [GET] /signup
    signup (req,res,next) {
        let o = req.query ? {
            message: req.query.message,
            alert: req.query.alert
        } : {}
        o.noheader = true
        res.render('Site/signup', o)
    }

    //* [POST] /signup
    register(req,res,next) {
        // res.send('REGISTER')

        User.findOne({email: req.body.email})
            .then((user) => {
                if(user) 
                    return res.redirect(url.format({
                        pathname: '/signup',
                        query:{
                            "message": "Email existed",
                            "alert": "danger"
                        }
                    }))
                
                if(req.body.password != req.body.passwordrepeat) 
                    return res.redirect(url.format({
                        pathname: '/signup',
                        query:{
                            "message": "Passwords aren't matching",
                            "alert": "danger"
                        }
                    }))
                
                bcrypt.hash(req.body.password, 10)
                      .then((psw) => {
                          let user = new User({
                              name: req.body.name,
                              password: psw,
                              email: req.body.email,
                          });

                          user.save()
                              .then(() => {res.redirect(url.format({
                                  pathname: '/login',
                                  query: {
                                      "message": "Account created successfully",
                                      "alert": "success",
                                  }
                              }))})
                              .catch(next)
                      })
                      .catch(next)  
                
            })
            .catch(next)
    }
}

module.exports = new HomeController();