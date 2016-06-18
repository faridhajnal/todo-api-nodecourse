module.exports = function(db){


	return {

		requireAuthentication : function(request,response,next){


			//next will go to the actual todos route
			var token = request.get('Auth'); //getting token
			db.user.findByToken(token).then(function(user){

				request.user = user;
				next(); //magic.

			}, function(e){

				response.status(401).send('Internal Server Error');

			});//custom class method.

		}

	};

}