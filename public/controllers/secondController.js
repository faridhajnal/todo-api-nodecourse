myApp.controller('secondController', function($scope,$http,$routeParams,$location,$timeout,localHostUrl,herokuUrl){

    var apiUrl;
    var url = $location.absUrl();
    console.log(url);
    $scope.confirmMessage="";

    if(url.indexOf('localhost')> -1) apiUrl = localHostUrl;
    else apiUrl = herokuUrl;



	var id = $routeParams.id;
	//console.log('ID: ' +id);

	$http.get(apiUrl +"todos/"+id).success(function(response, error){
        if(error===200){
       	$scope.todo = response;}


       	//console.log($scope.todo);
                        
    });

    $scope.transformBoolean = function(booleanValue){

    	//console.log(booleanValue);
    	var todo = document.getElementById('createdTodo');
    	
    	if(booleanValue){
    		todo.className = 'btn-success';
    		return 'Listo';

    	} 
    	else {

    		todo.className = 'btn-danger';
    		return 'Por completar';

    	}


    }


    $scope.deleteTodo = function(todoId){


        $http.delete(apiUrl +"todos/"+todoId).success(function(response, error){
        
        if(error===204){
            $timeout(function () {

                $scope.confirmMessage = "Todo Deleted from DB";
            }, 2000);
            
            $location.path('/');
        //console.log(error);
            


        }

        //console.log($scope.todo);
                        
        });
        //alert('clickin on delete btn, id: ' + todoId);


    }


	$scope.message = 'Hello from second controller';

});
