const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:9xHOJlsbi6wnGYtA@cluster0.6ogye63.mongodb.net/paytm');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
})

const User = mongoose.model('User', userSchema);

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    balance: {
        type: Number,
        required: true
    }
})

const Account = mongoose.model('Account', accountSchema);

module.exports = {User, Account};

