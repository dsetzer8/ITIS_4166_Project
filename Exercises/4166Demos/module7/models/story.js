const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');
const {ObjectId} = require('mongodb');
//Need a reference variable to the stories collection in MongoDB
let stories;
exports.getCollection = db => {
    stories = db.collection('stories');
}

exports.find = () => stories.find().toArray();

exports.findById = id => stories.findOne({_id: ObjectId(id)});

exports.save = story => stories.insertOne(story);

exports.updateById = (id, newStory) => stories.updateOne({_id: ObjectId(id)},
                    {$set:{title:newStory.title, content: newStory.content}});

exports.deleteById = id => stories.deleteOne({_id: ObjectId(id)});