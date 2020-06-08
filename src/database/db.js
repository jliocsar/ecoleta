// Import SQLite3 dependency
const sqlite3 = require('sqlite3').verbose()

// Instantiate database object
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db

// Serializing 
// db.serialize(() => {
  // Create database
  /*
  console.log('Creating database...')
  db.run(`
    CREATE TABLE IF NOT EXISTS places(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `)
  */

  // Insert values
  /*
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

  const values = [
    'image',
    'name',
    'address',
    'address2',
    'city',
    'state',
    'items'
  ]

  function afterInsertData(err) {
    if (err) {
      return console.error(err)
    }

    console.log('Cadastrado com sucesso')
    console.log(this)
  }

  db.run(query, values, afterInsertData)
  */

  // Delete entities by id
  /*
  db.run('DELETE FROM places WHERE id = ?', [1], function(err) {
    if (err) {
      return console.error(err)
    }

    console.log('Registro deletado com sucesso!')
  })
  */

  // Select data from tables
  /*
  db.all(`SELECT * FROM places`, function(err, rows) {
    if (err) {
      return console.error(err) 
    }

    console.log('Registros:')
    console.log(rows)
  })
  */
// })
