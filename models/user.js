module.exports = function(sequelize, DataTypes){

	//FILE FORMAT FOR SEQUELIZE IMPORT
	return sequelize.define('user', { //name of the model
		//fields for the model
		email : {

			type: DataTypes.STRING,
			allowNull : false, //self explanatory <<defaults to true??>>
			unique: true, //no other records on db with same value on this field
			validate : {

				isEmail: true //sequelize validation...

			}

		},

		password : {

			type: DataTypes.STRING,
			allowNull : false,
			validate : {

				len: [7, 40]

			}

		}

	});

};