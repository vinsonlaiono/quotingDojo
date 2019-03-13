const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      flash = require('express-flash'),
      session = require('express-session'),
      path = require('path'),
      port = process.env.PORT || 3000;

      console.log("PORT: ", process.env.PORT)

app.listen(port, () => console.log(`Listening on port: ${port}`));

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

require('./server/config/mongoose')
require('./server/config/routes.js')(app)

mongoose.Promise = global.Promise;

