angular.module('swaggedit')
    .directive('pathsConfigurator', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/directives/paths-configurator/index.html'
        }
    })
    .controller('pathsConfiguratorController', function(specService){
        var vm = this;

        vm.paths = Object.keys(specService.spec.paths);
        vm.pathsDetails = specService.spec.paths;
    });