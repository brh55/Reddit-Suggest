'use strict';

var app = angular.module('appRoutes', []);

app.config(['$routeProvider', '$locationProvider', function($routerProvider, $locationProvider) {

    // Set up angular routes
    $routeProvider
        // '/' Main Route
        .when('/', {
            templateUrl: 'views/suggest.html',
            controller: 'mainController',
            controllerAs: 'main'
        })
        // All-else redirect to main route
        .otherwise({
        	redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);
