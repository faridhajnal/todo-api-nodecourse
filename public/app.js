var myApp = angular.module('myApp',['ngRoute']); //note no dashes for services

myApp.constant('localHostUrl', 'http://localhost:3000/')
     .constant('herokuUrl', 'http://hajnal-todo-api.herokuapp.com/');


myApp.config(function($routeProvider){

	$routeProvider

	.when('/', {

		templateUrl: 'pages/home.html',
        controller: 'mainController'

	})

	.when('/createTodo', {

		templateUrl: 'pages/createTodo.html',
        controller: 'createTodoController'

	})	

	.when('/todo/:id', {

		templateUrl: 'pages/second.html',
        controller: 'secondController'

	})	



});

myApp.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if (window.confirm(msg)) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
}]);