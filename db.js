var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development'; 
//environment variables, using one specific (string)
//if NODE_ENV is null(not exists) will use development (local)
console.log(env);

var sequelize;

if(env==='production'){

	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect : 'postgres'
	})
	//connect to´postgres on heroku
}

else{


	sequelize = new Sequelize(undefined, undefined, undefined,{

	'dialect' : 'sqlite',
	'storage' : __dirname + '/data/dev-todo-api.sqlite'

	});
	//local database

}



var db = {}; //attach various properties to be able to export multiple things

db.todo = sequelize.import(__dirname + '/models/todo.js') //lets load sequelize moduels from separate files
//external file needs to follow certain format.
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;