const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session = require('express-session');

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

const flash = require('express-flash');
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/quoting_dojo');
var UserSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    quote: {type: String, required: true, minlength:2},
    created_at: {type: Date}

});
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

mongoose.Promise = global.Promise;

app.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log(err)
            res.redirect('/')

        } else {
            var allUsers = [];
            for (i = 0; i < users.length; i++) {
                allUsers.push(users[i]);
            }
        }
        console.log("All Users: ", allUsers)
        res.render('index', { users: allUsers });
        res.end()
        console.log("-------------")
    })
    // res.render('index')
})
app.get('/showQuotes', function (req, res) {
    User.find({}, function (err, users) {
    // User.find({}).sort({'creadted_at': -1}).exec(function (err, users) {
    // User.find({}, null, {sort: {date: -1}}, function(err, users) {
    // User.find({}, null, {sort: '-date'}, function(err, users) {
        if (err) {
            console.log(err)
            res.redirect('/')

        } else {
            var allUsers = [];
            for (i = 0; i < users.length; i++) {
                allUsers.push(users[i]);
            }
        }
        console.log("All Users: ", allUsers)
        res.render('quotes', { users: allUsers });
        res.end()
        console.log("-------------")
    })
    // res.render('index')
})
app.get('/deleteAll', function (req, res) {
    User.remove({}, function (err) {
        // This code will run when the DB has attempted to remove all matching records to {}
        res.redirect('/')
    })
})

// Add Quotes Request 
app.post('/users', function (req, res) {
    console.log("POST DATA", req.body);
    // create a new Quote with the name and age corresponding to those from req.body
    var user = new User({ name: req.body.username, quote: req.body.quote, created_at: new Date() });
    // Try to save that new  quote to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    user.save(function (err) {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log('something went wrong', err);
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a user!');
            res.redirect('/showQuotes');
        }
    })
})

app.listen(8000, function () {
    console.log('Listening on port: 8000')
});