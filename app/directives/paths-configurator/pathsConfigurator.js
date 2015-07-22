angular.module('swaggedit')
    .directive('pathsConfigurator', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/directives/paths-configurator/index.html'
        }
    })
    .controller('pathsConfiguratorController', function(specService, configuratorService, pathsParser){
        var vm = this;

        var parsedPaths = pathsParser.parse(specService.spec.paths);
        vm.paths = parsedPaths.paths;


        vm.newPath = function(){
            configuratorService.setConfig('newPathForm');
        };

        vm.editPath = function(path){
            configuratorService.setPath(path);
            configuratorService.setConfig('editPath');
        }
    });