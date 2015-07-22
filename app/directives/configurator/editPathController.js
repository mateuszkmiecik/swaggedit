angular.module('swaggedit')
    .controller('editPathController', function($scope, configuratorService){
        $scope.current = configuratorService.current;
    });