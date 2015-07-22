angular.module('swaggedit')
    .directive('configurator', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/directives/configurator/index.html'
        }
    })
    .controller('configuratorController', function(specService, configuratorService){

        var vm = this;
        vm.current = configuratorService.current;
        vm.spec = specService.spec;

        vm.showSpec = false;

        vm.toggleSpec = function(){
            vm.showSpec = !vm.showSpec;
        }

    })
    .factory('configuratorService', function(){

        var service = {};

        service.current = {
            template: 'default'
        };


        service.setConfig = function(name){
            service.current.template = name;
        };

        service.setPath = function(path){
            service.current.path = path;
        };

        return service;

    });