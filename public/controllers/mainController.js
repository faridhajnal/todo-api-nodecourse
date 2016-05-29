
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
	       	var todos= response;
	       	var counter = 0;
	       	todos.forEach(function(todo){

	       		if(todo.completed===false) counter++;


	       	});

	       	$scope.counter = counter;



	       	console.log('COUNTER '+ counter);


	        $scope.todocount = Object.keys($scope.todos).length;
      		//console.log("COUNT " + count); //extra, method to count number of results returned by query
	                        
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

		
		$http.put(apiUrl+"todos/"+todoId, {"completed":true}).success(function(response, error){
        
        console.log('correctly updated todo id# ' + todoId);
       	
        $http.get(apiUrl+"todos").success(function(response, error){
	        
	       	$scope.todos = response;
	       	var todos= response;
	       	var counter = 0;
	       	todos.forEach(function(todo){

	       		if(todo.completed===false) counter++;


	       	});

	       	$scope.counter = counter;

	       });

                       
    	});

	}




	$scope.createTodo = function(){

		$location.path('/createTodo');


	}



});