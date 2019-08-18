// * Import Package
const express = require('express')
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

// * Custom Middleware
const StorePostMiddleware = require('./middleware/StorePostMiddleware')

// * Use Package
app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(fileUpload())
app.use('/posts/store', StorePostMiddleware)

// * Import Controllers
const CreatePostController = require('./controllers/Posts/CreatePostController')
const StorePostController = require('./controllers/Posts/StorePostController')
const GetPostController = require('./controllers/Posts/GetPostController')
const HomeController = require('./controllers/HomeController')
const CreateUserController = require('./controllers/Users/CreateUserController')

// * Index Route
// app.get('/', (req, res) => {
// console.log(`${__dirname}/views`)
//   res.render('index')
// })

// Index Route Use Asyncronous Function
app.get('/', HomeController)

// * Posts Route
app.get('/post/new', CreatePostController)
app.get('/post/:id', GetPostController)
app.post('/posts/store', StorePostController)

// * Users Route
app.get('/auth/register', CreateUserController)

// * Server Run
app.listen(3000, () => {
  console.log('App Listening on port 3000')
})