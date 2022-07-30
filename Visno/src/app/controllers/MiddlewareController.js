const jwt = require('jsonwebtoken')
const url = require('url')
const User = require('../models/User')

class MiddlewareController {

    verifyToken(req, res, next) {
        const token = req.cookies.token
        if (token) {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err)
                    return res.redirect(url.format({
                        pathname: '/auth/login',
                        query: {
                            'message': "Invalid token",
                            'alert': 'danger'
                        }
                    }));

                next()
            })
        }
        else {
            return res.redirect(url.format({
                pathname: '/auth/login',
                query: {
                    'message': "You're not authenticated ",
                    'alert': 'danger'
                }
            }))
        }
    }

    setUser(req, res, next) {

        if (!req.session.userid) return next()

        User.findById(req.session.userid)
            .then((user) => {
                if (!user) return res.send(req.session.userid)
                req.user = user.toObject();
                req.user.password = ''
                next()
            })
            .catch((err) => {
                console.log('User not exist\n ' + err)
            })
    }

    requireLogin(req, res, next) {
        if (req.user)
            return next()

        res.redirect(url.format({
            pathname: '/auth/login',
            query: {
                message: 'You have to login first',
                alert: 'warning'
            }
        }))
    }
}

module.exports = new MiddlewareController()