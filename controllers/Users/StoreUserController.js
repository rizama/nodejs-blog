const User = require('../../database/models/User')

module.exports = (req, res) => {
  User.create(req.body, (error, post) => {
    res.redirect('/')
  })
}