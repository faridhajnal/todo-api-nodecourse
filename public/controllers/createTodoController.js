myApp.controller('createTodoController', ['$scope', '$http', '$location', '$timeout',
'localHostUrl','herokuUrl', function(scope,http,location,timeout,localHostUrl,herokuUrl){

	scope.confirmMessage="";
	var url = location.absUrl();

	scope.sendNewTodo = function(){
	if(url.indexOf('localhost')> -1) apiUrl = localHostUrl;
	else apiUrl = herokuUrl;

		//console.log('Hello man');
		var newTodo = {

			'completed' : false,

			'description' : scope.description

		}

		http.post(apiUrl + "todos", newTodo).success(function(response,error){
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