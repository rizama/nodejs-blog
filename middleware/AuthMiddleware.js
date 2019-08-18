const User = require('../database/models/User')

module.exports = (req, res, next) => {
  // Fetch user form database
  // Verify user
  // if user is valid, permit requiest
  // else redirect
  User.findById(req.session.userId, (error, user) => {
    if (error || !user) {
      return res.redirect('/auth/login')
    }
    next()
  })
}