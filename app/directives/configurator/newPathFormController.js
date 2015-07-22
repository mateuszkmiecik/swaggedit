angular.module('swaggedit')
    .controller('newPathFormController', function($scope, pathsParser, configuratorService){
        $scope.found = false;
        $scope.checkPath = function(){
            $scope.found = pathsParser.pathsKeys.indexOf($scope.newPath.url) >= 0;
        };

        $scope.add = function(newPath){

            //_.

        };

        $scope.edit = function(newPath){
            var tempPaths = pathsParser.paths;
            var path = _.find(tempPaths.paths, {name: newPath.url});

            configuratorService.setPath(path);
            configuratorService.setConfig('editPath');
        }

    });