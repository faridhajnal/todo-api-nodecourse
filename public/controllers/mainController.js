
myApp.controller('mainController', function($scope,$http,$routeParams,$location){
	var apiUrl;
	var url = $location.absUrl();
	console.log(url);


	if(url.indexOf('localhost')> -1) apiUrl = "http://localhost:3000/";
	else apiUrl = "http://hajnal-todo-api.herokuapp.com/";


	
	$http.get(apiUrl+"todos").success(function(response, error){
        
       	$scope.todos = response;
                        
    });
	$scope.message = 'These are all your TODOs on the DB';

});