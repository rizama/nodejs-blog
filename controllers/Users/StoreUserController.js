const User = require('../../database/models/User')

module.exports = (req, res) => {
  User.create(req.body, (error, post) => {
    console.log(Object.keys(error.errors).map(key => error.errors[key].message))
    const registerErrors = Object.keys(error.errors).map(key => error.errors[key].message)

    // Set Flash Session for validation errors
    req.flash('registerErrors', registerErrors)

    // Set Flash Session Previous Data
    req.flash('data', req.body)

    if (error) {
      return res.redirect('/auth/register')
    }
    res.redirect('/')
  })
}