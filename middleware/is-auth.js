const jwt               = require('jsonwebtoken')
      userKey           = require('../../config/userKey.json')


mondule.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if(!authHeader) { 
        req.isAuth = false
        return next()
    }

    const token = authHeader.split(' ')[1]
    if(!token || token === '') {
        req.isAuth = false
        return next()
    }

    jwt.verify(token, userkey['JWT_SECRET'])
}
