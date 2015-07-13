angular.module('swaggedit').factory('specService', function($http, $q){

    var service = {};
    service.ready = false;
    service.init = init;
    service.spec = {};
    return service;

    function init(){
        return $http.get('/spec').then(handleSuccess, handleError).then(function(data){
            service.ready = true;
            angular.copy(data, service.spec);
        });
    }

    // private methods
    // private methods
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