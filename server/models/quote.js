const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quoting_dojo');
var UserSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    quote: {type: String, required: true, minlength:2},
    created_at: {type: Date}

});
mongoose.model('User', UserSchema);