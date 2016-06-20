var cryptojs = require('crypto-js');
module.exports = function(db){


	return {

		requireAuthentication : function(request,response,next){


			//next will go to the actual todos route
			var token = request.get('Auth') || ''; //getting token

			db.token.findOne({

				where : {

					tokenHash : cryptojs.MD5(token).toString()

				}

			}).then(function(tokenInstance){

				if(!tokenInstance) throw new Error();

				request.token = tokenInstance;
				return db.user.findByToken(token);

			}).then(function(user){

				request.user = user;
				next(); //continue with execution.

			}).

			catch(function(){
				response.status(401).send();
			});


		}

	};

}