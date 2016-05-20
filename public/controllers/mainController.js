
myApp.controller('mainController', function($scope,$http,$routeParams){

	$http.get("http://localhost:3000/todos").success(function(response, error){
        
       	$scope.todos = response;
                        
    });
	$scope.message = 'These are all your TODOs on the DB';

});