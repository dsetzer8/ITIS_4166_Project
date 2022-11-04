const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    title: {type: String, required: [true, 'Title is required']},
    category: {type: String, required: [true, 'Category is required']},
    details: {type: String, required: [true, 'Details are required'],
             minLength: [10, 'The details should have at least 10 characters.']},
    author: {type: String, required: [true, 'Author is required']},
    location: {type: String, required: [true, 'Location is required']},
    image: {type: String}
},
{timestamps: true}
);

//collection name is Connections in the database
module.exports = mongoose.model('Connection', connectionSchema);
