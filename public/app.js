var myApp = angular.module('myApp',['ngRoute']); //note no dashes for services


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