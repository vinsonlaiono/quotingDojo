const mongoose = require('mongoose');
const User = mongoose.model('User');

const quotes = {
    index: (req, res) =>{
        User.find({}, (err, users) => {
            if (err) {
                console.log(err)
                res.redirect('/')
            } else {
                let allUsers = [];
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
    },
    users: (req, res) => {
        console.log("POST DATA", req.body);
        // create a new Quote with the name and age corresponding to those from req.body
        var user = new User({ name: req.body.name, quote: req.body.quote, created_at: new Date() });
        // Try to save that new  quote to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
        user.save((err) => {
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
    },
    showQuotes: (req, res) =>{
        User.find({}, (err, users) => {
            if (err) {
                console.log(err)
                res.redirect('/')
            } else {
                let allUsers = [];
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
    },
    deleteAll: (req, res) => {
        User.remove({}, (err) => res.redirect('/'));
    }
}

module.exports = quotes;

