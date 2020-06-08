const { Router } = require('express')

// Initializing routes
const routes = Router()

// Database require
const db = require('./database/db')

// Index route
routes.get('/', (req, res) => {
  return res.render('index.html')
})

// Create point route
routes.get('/create-point', (req, res) => {
  return res.render('create-point.html')
})

// Save point route
routes.post('/savepoint', (req, res) => {
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `

  const { body: { image, name, address, address2, state, city, items } } = req

  const values = [ image, name, address, address2, state, city, items ]

  function afterInsertData(err) {
    if (err) {
      console.error(err)
      return res.render('not-found.html', { 
        title: 'Erro no cadastro', 
        description: 'Não foi possível finalizar o cadastro :/' 
      })
    }

    console.log('Cadastrado com sucesso')
    console.log(this)

    return res.render('create-point.html', { saved: true })
  }

  db.run(query, values, afterInsertData)
})

// Search results route
routes.get('/search', (req, res) => {
  const { search } = req.query

  if (!search) {
    return res.render('search-results.html', { total: 0 })
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if (err) {
      return console.error(err) 
    }

    // Collect the length of rows to pass to search-results
    const { length: total } = rows

    return res.render('search-results.html', { places: rows, total })
  })
})

routes.use((req, res) => {
  return res.status(404).render('not-found.html', { 
    title: '404', 
    description: 'Parece que essa página não existe :(' 
  })
})

module.exports = routes
