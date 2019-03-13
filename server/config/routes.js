const quotes = require('../controllers/quotes.js')

module.exports = function (app) {
    // All routes go here

    //renders the root route page
    app.get('/', (req, res) => {
        quotes.index(req, res);
    })
    // renders the show quotes page
    app.get('/showQuotes', (req, res) =>{
        quotes.showQuotes(req, res);
    })
    // deletes all data
    app.get('/deleteAll', (req, res) => {
        quotes.deleteAll(req, res);
    })
    // Add Quotes Request 
    app.post('/users', (req, res) => {
        quotes.users(req, res)
    })

}