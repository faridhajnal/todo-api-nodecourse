
myApp.controller('mainController', function($scope,$http,$routeParams,$location,localHostUrl,herokuUrl){
	var apiUrl;
	var url = $location.absUrl();
	console.log(url);


	if(url.indexOf('localhost')> -1) apiUrl = localHostUrl;
	else apiUrl = herokuUrl;


	$http.get(apiUrl+"todos").success(function(response, error){
        
       	$scope.todos = response;
                        
    });
	$scope.message = 'These are all your TODOs on the DB';

});