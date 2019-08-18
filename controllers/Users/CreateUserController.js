module.exports = (req, res) => {
  res.render('register', {
    // Call Flash Session
    errors: req.flash('registerErrors'),
    data: req.flash('data')[0]
  })
}