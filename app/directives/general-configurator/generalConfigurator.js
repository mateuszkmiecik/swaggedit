angular.module('swaggedit')
    .directive('generalConfigurator', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/directives/general-configurator/index.html'
        }
    })
    .controller('generalConfiguratorController', function(specService){
        var vm = this;

        vm.spec = specService.spec;
    });