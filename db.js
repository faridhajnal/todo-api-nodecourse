var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined,{

	'dialect' : 'sqlite',
	'storage' : __dirname + '/data/dev-todo-api.sqlite'

});


var db = {}; //attach various properties to be able to export multiple things

db.todo = sequelize.import(__dirname + '/models/todo.js') //lets load sequelize moduels from separate files
//external file needs to follow certain format.
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;