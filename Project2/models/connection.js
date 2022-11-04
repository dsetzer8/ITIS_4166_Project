//Required Modules
const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');
const {ObjectId} = require('mongodb');
var _ = require('lodash');

//Need a reference variable to the connections collection in MongoDB
let connections;
exports.getCollection = db =>{
    connections = db.collection('connection');
}
exports.find = () => connections.find().toArray();

exports.findById = id => connections.findOne({_id: ObjectId(id)});//Must be Object id

exports.save = function (connection) {
    connection.id = uuidv4();
    connection.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    connections.push(connection);
};

exports.updateById = function(id, newConnections){
    let connection = connections.find(connection=>connection.id === id);
    if(connection){
        connection.title = newConnections.title;
        connection.author = newConnections.author;
        connection.category = newConnections.category;
        connection.location = newConnections.location;
        connection.details = newConnections.details;
        connection.image = newConnections.image;
        return true;
    }else{
        return false;
    }
}

exports.deleteById = function(id) {
    let index = connections.findIndex(connection =>connection.id === id);
    if(index !== -1){
        connections.splice(index, 1);
        return true;
    } else {
        return false;
    }
}
