angular.module('swaggedit')
    .directive('loader', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/directives/loader/loader.html'
        }
    });