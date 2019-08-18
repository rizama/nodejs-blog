const Post = require('../../database/models/Post')

module.exports = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    console.log(post)
    res.render('post', {
      post
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError') {
      res.status(404).send('Post ID not Found')
    } else {
      res.status(500).send('Error Getting Post')
    }
  }
}