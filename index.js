// * Import Package
const express = require('express')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')

// * Create new Express
const app = new express()

// * Connect to Mongodb
mongoose.connect('mongodb://localhost/node-js-blog', {
  useNewUrlParser: true
})
mongoose.set('useCreateIndex', true);

// * Custom Middleware
const StorePostMiddleware = require('./middleware/StorePostMiddleware')
const AuthMiddleware = require('./middleware/AuthMiddleware')

// * Use Package
app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(fileUpload())
const mongoStore = connectMongo(expressSession)
app.use(expressSession({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })
}))

// * Import Controllers
const CreatePostController = require('./controllers/Posts/CreatePostController')
const StorePostController = require('./controllers/Posts/StorePostController')
const GetPostController = require('./controllers/Posts/GetPostController')
const HomeController = require('./controllers/HomeController')
const CreateUserController = require('./controllers/Users/CreateUserController')
const StoreUserController = require('./controllers/Users/StoreUserController')
const LoginUserController = require('./controllers/Users/LoginUserController')
const LoginProcessController = require('./controllers/Users/LoginProcessController')

// * Index Route
// app.get('/', (req, res) => {
// console.log(`${__dirname}/views`)
//   res.render('index')
// })

// Index Route Use Asyncronous Function
app.get('/', HomeController)

// * Posts Route
app.get('/post/new', AuthMiddleware, CreatePostController)
app.get('/post/:id', GetPostController)
app.post('/posts/store', AuthMiddleware, StorePostMiddleware, StorePostController)

// * Users Route
app.get('/auth/register', CreateUserController)
app.post('/users/register', StoreUserController)
app.get('/auth/login', LoginUserController)
app.post('/users/login', LoginProcessController)

// * Server Run
app.listen(3000, () => {
  console.log('App Listening on port 3000')
})