const User = require('../../database/models/User')
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
  const {
    email,
    password
  } = req.body

  // Try to find the user
  User.findOne({
    email
  }, (error, user) => {
    if (user) {
      // compare password
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          // Set userId in Coockies
          req.session.userId = user._id
          res.redirect('/')
        } else {
          res.redirect('/auth/login')
        }
      })
    } else {
      return res.redirect('/auth/login')
    }
  })
}