angular
    .module('swaggedit', ['ui.materialize', 'ui.router']);


angular.module('swaggedit')
.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/partials/main/index.html',
                controller: 'mainController',
                controllerAs: 'vmc'
            })
            .state('generator', {
                url: '/generator',
                templateUrl: 'app/partials/generator/generator.html',
                controller: 'generatorController',
                controllerAs: 'generator'
            });

        $urlRouterProvider.otherwise('/');
    });