const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');
const connections = [
{
    id: '1',
    title: 'LAN Tournament - Valorant',
    category: 'Gaming',
    details: 'We will be hosting a LAN tournament for Valorant. The tournament will consist of bracket play or anyone looking to find new teammates.',
    author: 'Dalton Setzer',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    location:'UNCC Charlotte Student Union',
    image:'valoranttournament.png'
},
{
    id: '2',
    title: 'Escape From Tarkov',
    category: 'Gaming',
    details: 'We will be hosting a LAN tournament for Escape From Tarkov. The tournament will consist of bracket play or anyone looking to find new teammates.',
    author: 'Dalton Setzer',
    createdAt: DateTime.local(2022, 09, 30, 0).toLocaleString(DateTime.DATETIME_SHORT),
    location:'UNCC ',
    image:'sample.jpg'
}
];

exports.find = () => connections;

exports.findById = id => connections.find(connection=>connection.id === id);

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
