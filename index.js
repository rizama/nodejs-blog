// * Import Package
const express = require('express')
const path = require('path')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

// * Create new Express
const app = new express()

// * Connect to Mongodb
mongoose.connect('mongodb://localhost/node-js-blog', {
  useNewUrlParser: true
})

// * Use Package
app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(fileUpload())
app.use('/posts/store', validateCreatePostMiddleware)

// * Import Model 
const Post = require('./database/models/Post')

// * Custom Middleware
const validateCreatePostMiddleware = (req, res, next) => {

  if (!req.files.image || !req.body.title || !req.body.description || !req.body.content || !req.body.username) {
    return res.redirect('/posts/new')
  }

  next()
}

// * Index Route
// app.get('/', (req, res) => {
// console.log(`${__dirname}/views`)
//   res.render('index')
// })

// Index Route Use Asyncronous Function
app.get('/', async (req, res) => {
  const posts = await Post.find({})
  console.log(posts)
  res.render('index', {
    posts: posts
  })
})

// * About Route
app.get('/about', (req, res) => {
  res.render('about')
})

// * Contact Route
app.get('/contact', (req, res) => {
  res.render('contact')
})

// * Posts Route
app.get('/post/new', (req, res) => {
  res.render('create')
})

app.get('/post/:id', async (req, res) => {
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

})

app.post('/posts/store', (req, res) => {
  const {
    image
  } = req.files

  image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
    Post.create({
      ...req.body,
      image: `/posts/${image.name}`
    }, (error, post) => {
      res.redirect('/')
    })
  })
})

// * Server Run
app.listen(3000, () => {
  console.log('App Listening on port 3000')
})