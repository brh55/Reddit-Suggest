'use strict';

var app = angular.module('appRoutes', []);

app.config(['$routeProvider', '$locationProvider', function($routerProvider, $locationProvider) {

    // Set up angular routes
    $routeProvider
        // '/' Main Route
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainController'
        })
        // All-else redirect to main route
        .otherwise({
        	redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);
