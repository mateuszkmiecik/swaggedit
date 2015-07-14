angular.module('swaggedit').factory('specService', function($http, $q){

    var service = {};
    service.ready = false;
    service.init = init;
    service.spec = {};
    return service;

    function init(){
        var defer = $q.defer();
        $http.get('/spec').then(handleSuccess, handleError).then(function(data){

            service.ready = true;
            angular.copy(data, service.spec)
            createDefaults();
            defer.resolve(service.spec);

        });
        return defer.promise;
    }

    function createDefaults(){
        // create defaults if no specified
    }

    // helper methods
    function handleError(response) {
        if (!angular.isObject(response.data) || !response.data.message) {
            return ( $q.reject("An unknown error occurred.") );
        }
        // Otherwise, use expected error message.
        return ( $q.reject(response.data.message) );
    }

    function handleSuccess( response ) {
        return( response.data );
    }

});