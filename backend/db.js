const { number } = require('zod');

const mongoose = require('mongoose');
require('dotenv').config();

const MONGOOSE_KEY = process.env.MONGOOSE_KEY;

mongoose.connect(MONGOOSE_KEY)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    } ,
    password: {
        type: String,
        required:true,
        minLength: 6,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    } ,
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    } ,
});

const accountSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    balance: {
        type: Number,
        required: true
    }
})

const Account = mongoose.model('Account',accountSchema);
const User = mongoose.model('User',userSchema);

module.exports = {User,Account}
