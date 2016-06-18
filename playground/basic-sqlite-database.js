var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined,{

	'dialect' : 'sqlite',
	'storage' : 'basic-sqlite-database.sqlite'

});

//first param is model
var Todo = sequelize.define('todo', {

	description: {

		type: Sequelize.STRING,
		allowNull : false, //self explanatory <<defaults to true??>>
		validate : {

			//notEmpty : true //prevent empty strings
			len:[1,250] //minimum, maximum...


		}

	},

	completed:{

		type: Sequelize.BOOLEAN,
		allowNull : false,
		defaultValue : false


	}

});

var User = sequelize.define('user', {
	email : Sequelize.STRING
});


Todo.belongsTo(User);

User.hasMany(Todo);

sequelize.sync(/*{force:true}*/).then(function(){

	console.log('everything is synced');

	User.findById(1).then(function(user){
		user.getTodos({//sequelize provide method.
			where:{
				completed : false
			}
		}).then(function(todos){
			todos.forEach(function (todo){
				console.log(todo.toJSON());
			});
		});
	});


	// User.create({
	// 	email:'fafas@mail.com'
	// }).then(function(){
	// 	return Todo.create({
	// 		description:'some'
	// 	});
	// }).then(function(todo){
	// 	User.findById(1).then(function(user){
	// 		user.addTodo(todo);
	// 	});
	// })







	/*Todo.findById(13).then(function(todo){
		if(todo) console.log(todo.toJSON());
		else console.log('Id not found');
	});*/

	// Todo.create({

	// 	description : 'Adding and fetching',
	// 	//completed : false  <<can be ignored:: has default value>>

	// }).then(function(){
	// 	//return Todo.findById(1)
	// 	return Todo.findAll({
	// 		where: {
	// 			completed:false
	// 		}
	// 		//implementation with object:
	// 		//where: { description: { $like: '%string%'} }
	// 		//%% are wildcards
	// 	});

	// }).then(function(todos){

	// 	if(todos) {

	// 		todos.forEach(function(todo){
	// 			console.log(todo.toJSON());
	// 		});

	// 	}
	// 	else console.log('No corresponding TODO');
	// }).catch(function(error){
	// 	//following promise form
	// 	console.log(error);

	// })

});

//sequelize allows handling data as javascript and arrays <<works for differentd DBs>>
//it would be possible to use use sqlite, but commands are more complicated, that's when sequelize makes lot of sense.