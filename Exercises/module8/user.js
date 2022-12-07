const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: [true, 'name field is required']},
    age: {type: Number,
        required: [true, 'age is required'],
        min: [1, 'minimum age is 1'],
        max: [120, 'max age is 120']},
    rank: {type: String,
        required: [true, 'rank is required'],
        enum: ['private', 'sergeant', 'captain', 'major']},
    phone: {type: String,
        required: [true, 'phone field is required'],
        match: [/\d{3}-\d{4}/, 'phone number is not valid']}
});
const User = mongoose.model('User', userSchema);
const user = new User({
    name: 'Billy Pilgrim',
    age: 64,
    rank: 'private',
    phone: '704-444-444'
});

console.log(user);

user.validate()
.then(()=>console.log('Document is validated'))
.catch(err=>console.log(err.message));