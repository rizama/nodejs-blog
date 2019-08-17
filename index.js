// * Import Package
const express = require('express')
const path = require('path')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = new express()

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

// * Index Route
app.get('/', (req, res) => {
  // console.log(`${__dirname}/views`)
  res.render('index')
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
app.get('/post', (req, res) => {
  res.render('post')
})

app.get('/post/new', (req, res) => {
  res.render('create')
})

app.post('/posts/store', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

// * Server Run
app.listen(3000, () => {
  console.log('App Listening on port 3000')
})