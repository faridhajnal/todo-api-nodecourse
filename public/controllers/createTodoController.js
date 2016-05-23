myApp.controller('createTodoController', ['$scope', '$http', '$location', '$timeout', function(scope,http,location,timeout){

	scope.confirmMessage="";


	scope.sendNewTodo = function(){


		//console.log('Hello man');
		var newTodo = {

			'completed' : false,

			'description' : scope.description

		}

		http.post('http://localhost:3000/todos', newTodo).success(function(response,error){
			if(error===200){
				scope.confirmMessage = "Todo Added to  DB";


				timeout(function () {
				
					location.path('/');
                
            	}, 4000);

				
				


			}
			console.log(error);


		});


	}


}]);