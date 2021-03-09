const { errorResponse } = require('../helpers')
const { User } = require('./../db/models')

const jwt = require('jsonwebtoken')

const apiAuth = async (req, res, next) => {
  if (!(req.headers && req.headers['Authorization'])) {
    return res.status(401).send('Token is not provided')
  }
  const token = req.headers['Authorization']
  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    req.user = decoded.user
    const user = await User.scope('withSecretColumns').findOne({
      where: { email: req.user.email },
    })
    if (!user) {
      return res.status(401).send('User is not found in system')
    }
    const reqUser = { ...user.get() }
    reqUser.userId = user.id
    req.user = reqUser
    return next()
  } catch (error) {
    return res.status(401).send('Incorrect token is provided, try re-login')
  }
}

module.exports = apiAuth
