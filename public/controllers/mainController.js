
myApp.controller('mainController', function($scope,$http,$routeParams,$location,localHostUrl,herokuUrl){
	var apiUrl;
	var url = $location.absUrl();
	console.log(url);


	$scope.todoFilter = false;


	if(url.indexOf('localhost')> -1) apiUrl = localHostUrl;
	else apiUrl = herokuUrl;

	if(!$scope.todoFilter)
	{
		$http.get(apiUrl+"todos").success(function(response, error){
	        
	       	$scope.todos = response;
	                        
	    });
	}
	$scope.message = 'These are all your TODOs on the DB';


	$scope.filterOnlyIncomplete = function(){

		$http.get(apiUrl+"todos/?completed=false").success(function(response, error){
        
       	$scope.todos = response;
        $scope.todoFilter = true;                
    	});


	}

	$scope.markAsCompleted = function(todoId){

		console.log('Mark as Completed ID: ' + todoId);


	}



});