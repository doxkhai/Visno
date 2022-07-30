const url = require('url')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const User = require('../models/User')

class AuthController {


    //* [GET] /auth/login
    login(req, res, next) {
        let o = req.query ? {
            message: req.query.message,
            alert: req.query.alert
        } : {}
        o.noheader = true
        res.render('Site/signin', o)
    }

    //* [POST] /auth/login
    signin(req, res, next) {
  
        User.findOne({ email: req.body.email })
            .then((user) => {
                const failUrl = url.format({
                    pathname: '/auth/login',
                    query: {
                        'message': 'Wrong email or password',
                        'alert': 'danger'
                    }
                })

                if (!user) return res.redirect(failUrl)

                bcrypt.compare(
                    req.body.password,
                    user.password
                )
                    .then((validPsw) => {
                        if (!validPsw) return res.redirect(failUrl)

                        //* Successfully login
                        req.session.userid = user._id

                        const accessToken = jwt.sign({
                            id: user._id,
                        },
                            process.env.JWT_ACCESS_KEY,
                            { expiresIn: "2h" }
                        )
                        let token = 'Bearer ' + accessToken

                        res.cookie("token", token, {
                            httpOnly: true,
                            secure: false,
                            sameSite: "strict",
                        })
                        res.redirect('/')
                    })
                    .catch(next)
            })
            .catch(next)
    }

    //* [GET] /auth/signup
    signup(req, res, next) {
        let o = req.query ? {
            message: req.query.message,
            alert: req.query.alert
        } : {}
        o.noheader = true
        res.render('Site/signup', o)
    }

    //* [POST] /auth/signup
    register(req, res, next) {
        // res.send('REGISTER')

        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user)
                    return res.redirect(url.format({
                        pathname: '/auth/signup',
                        query: {
                            "message": "Email existed",
                            "alert": "danger"
                        }
                    }))

                if (req.body.password != req.body.passwordrepeat)
                    return res.redirect(url.format({
                        pathname: '/auth/signup',
                        query: {
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
                            .then(() => {
                                res.redirect(url.format({
                                    pathname: '/auth/login',
                                    query: {
                                        "message": "Account created successfully",
                                        "alert": "success",
                                    }
                                }))
                            })
                            .catch(next)
                    })
                    .catch(next)

            })
            .catch(next)
    }

    //* [GET] /auth/logout
    logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                return next(err)
            }

            res.clearCookie("token")
            return res.redirect('/auth/login')
        })
    }


    //* [PUT] /test-put
    testPut(req, res, next) {
        res.json({ message: 'Successful' })
    }
}

module.exports = new AuthController();