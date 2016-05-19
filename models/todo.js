module.exports = function(sequelize, DataTypes){


	return sequelize.define('todo', {

		description: {

			type: DataTypes.STRING,
			allowNull : false, //self explanatory <<defaults to true??>>
			validate : {

				//notEmpty : true //prevent empty strings
				len:[1,250] //minimum, maximum...


			}

		},

		completed:{

			type: DataTypes.BOOLEAN,
			allowNull : false,
			defaultValue : false


		}

	});

};