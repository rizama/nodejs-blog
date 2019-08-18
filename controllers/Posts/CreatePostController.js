module.exports = (req, res) => {
  console.log(error)
  if (req.session.userId) {
    return res.render('create')
  }
  return res.redirect('/auth/login')
}