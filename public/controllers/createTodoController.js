myApp.controller('createTodoController', ['$scope', '$http', '$location', function(scope,http,location){

	

	scope.sendNewTodo = function(){


		//console.log('Hello man');
		var newTodo = {

			'completed' : false,

			'description' : scope.description

		}

		http.post('http://localhost:3000/todos', newTodo).success(function(response,error){
			if(error===200){

				alert('ToDo agregado satisfactoriamente :D');
				location.path('/');


			}
			console.log(error);


		});


	}


}]);