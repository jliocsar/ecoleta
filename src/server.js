// Requiring Express and Nunjucks modules
const express = require('express')
const nunjucks = require('nunjucks')

const routes = require('./routes')

// Database require
const db = require('./database/db')

// Instantiating Express object
const server = express()

// Nunjucks HTML templates folder
nunjucks.configure('src/views', {
  express: server,
  noCache: true
})

// Current server port
const PORT = 3000

// Middlewares
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

// Use routes
server.use(routes)

// Server listen to PORT
server.listen(PORT)
