angular.module('swaggedit')
    .controller('mainController', function (specService, $timeout) {

        var vm = this;
        vm.loading = true;
        vm.spec = specService.spec;


        specService.init().then(function(){
            $timeout(function(){
                vm.loading = false;
            }, 500);
        });

    });