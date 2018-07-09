const quotes = require('../controllers/quotes.js')

module.exports = function (app) {
    // All routes go here

    //renders the root route page
    app.get('/', function (req, res) {
        quotes.index(req, res);
    })
    // renders the show quotes page
    app.get('/showQuotes', function(req, res){
        quotes.showQuotes(req, res);
    })
    // deletes all data
    app.get('/deleteAll', function (req, res) {
        quotes.deleteAll(req, res);
    })
    // Add Quotes Request 
    app.post('/users', function (req, res) {
        quotes.users(req, res)
    })

}