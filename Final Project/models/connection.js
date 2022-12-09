const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    title: {type: String, required: [true, 'Title is required']},
    category: {type: String, required: [true, 'Category is required']},
    details: {type: String, required: [true, 'Details are required'],
             minLength: [10, 'The details should have at least 10 characters.']},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    location: {type: String, required: [true, 'Location is required']},
    image: {Type: String}
},
{timestamps: true}
);

// Collection name is Connections in the database
module.exports = mongoose.model('Connection', connectionSchema);
