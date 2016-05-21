module.exports = function(sequelize, DataTypes){

	//FILE FORMAT FOR SEQUELIZE IMPORT
	return sequelize.define('todo', { //name of the model
		//fields for the model
		description: {

			type: DataTypes.STRING,
			allowNull : false, //self explanatory <<defaults to true??>>
			validate : {

				len:[1,250] //minimum, maximum length of string for description

			}

		},

		completed:{

			type: DataTypes.BOOLEAN,
			allowNull : false,
			defaultValue : false //if user does not specify it on query


		}

	});

};