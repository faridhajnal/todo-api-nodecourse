var myApp = angular.module('myApp',['ngRoute']); //note no dashes for services

myApp.constant('localHostUrl', 'http://localhost:3000/')
     .constant('herokuUrl', 'http://hajnal-todo-api.herokuapp.com/');


myApp.config(function($routeProvider){

	$routeProvider

	.when('/', {

		templateUrl: 'pages/home.html',
        controller: 'mainController'

	})

	.when('/todo/:id', {

		templateUrl: 'pages/second.html',
        controller: 'secondController'

	})



});