'use strict';

angular.module('redditApp', [
    'ui.router',
    'redditApp.suggest'
])

.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');
    // Set up angular routes
    $stateProvider
        // '/' Main Route
        .state('home', {
            url: '/home',
            templateUrl: 'views/suggest.html',
            controller: 'suggestCtrl as suggest'
        });

    $locationProvider.html5Mode(true);
});
