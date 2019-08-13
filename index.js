const express = require('express')
const path = require('path')
const expressEdge = require('express-edge')

const app = new express()

app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
})

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
})

app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'))
})

app.listen(3000, () =>{
    console.log('App Listening on port 3000')
})