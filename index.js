const express = require('express')
const path = require('path')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')

const app = new express()

mongoose.connect('mongodb://localhost/node-js-blog', {
  useNewUrlParser: true
})

app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)

app.get('/', (req, res) => {
  // console.log(`${__dirname}/views`)
  res.render('index')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/post', (req, res) => {
  res.render('post')
})

app.get('/post/new', (req, res) => {
  res.render('create')
})

app.listen(3000, () => {
  console.log('App Listening on port 3000')
})