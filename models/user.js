var bcrypt = require('bcryptjs');
var _ = require('underscore');


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

		salt:{
			type:DataTypes.STRING //adding characters at end of password so that hash is not the same
		},

		password_hash:{
			type:DataTypes.STRING //hash the given string
		},



		password : {

			type: DataTypes.VIRTUAL, //Not stored on DB, but accessible
			allowNull : false,
			validate : {

				len: [7, 40]

			},

			set:function(value){
				//value is password, overwriting fucntion SET
				var salt = bcrypt.genSaltSync(10);
				var hashedPass = bcrypt.hashSync(value,salt);

				this.setDataValue('password', value);
				this.setDataValue('salt',salt); //salt stored in DB
				this.setDataValue('password_hash', hashedPass);

			}

		}

	},

		{ 

		hooks: {

			beforeValidate : function(user, options){

				if(typeof user.email === 'string'){

					user.email = user.email.toLowerCase();


				}

			}

		},

			instanceMethods: {

				toPublicJSON: function(){
					//will only return public properties

					var json = this.toJSON();
					return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
					//elements to 'pick'
				}
			}


		//}



		

	});

};