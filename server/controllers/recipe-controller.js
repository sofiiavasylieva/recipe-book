// Import database
const knex = require('../db')

// Retrieve all recipe
exports.recipeAll = async (req, res) => {
  // Get all recipe from database
  knex
    .select('*') // select all records
    .from('books') // from 'books' table
    .then(userData => {
      // Send books extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving recipe: ${err}` })
    })
}

// Create new book
exports.recipeCreate = async (req, res) => {
  // Add new book to database
  knex('books')
    .insert({ // insert new record, a book
      'author': req.body.author,
      'title': req.body.title,
      'time': req.body.time,
      'description': req.body.description
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `Recipe \'${req.body.title}\' by ${req.body.author} created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.title} recipe: ${err}` })
    })
}

// Remove specific book
exports.recipeDelete = async (req, res) => {
  // Find specific book in the database and remove it
  knex('books')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `Recipe ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} recipe: ${err}` })
    })
}

// Remove all recipe on the list
exports.recipeReset = async (req, res) => {
  // Remove all recipe from database
  knex
    .select('*') // select all records
    .from('books') // from 'books' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'Recipe list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting recipe list: ${err}.` })
    })
}
