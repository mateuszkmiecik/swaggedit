angular.module('swaggedit')
    .controller('generatorController', function () {

        var vm = this;

        vm.TYPES = ['string', 'integer'];

        vm.parse = parse;


        vm.urlName = '';
        vm.object = {};

        vm.newRoute = {};
        vm.newRoute.url = 'put /asdf/{is}';

        parse(vm.newRoute);


        // implementation

        function parse(route) {

            vm.urlName = '';

            var METHODS = ['get', 'post', 'put', 'delete'];

            var input = route.url.split(' ');
            if (input.length <= 1) return;
            if (input[1][0] != '/') {
                input[1] = '/' + input[1];
                route.url = input.join(' ');
            }

            var URL = input[1].split('/');
            var controller = URL[1] || 'controller';

            if (METHODS.indexOf(input[0].toLowerCase()) < 0) {
                return;
            }

            var method = input[0].toLowerCase();
            vm.method = method;
            vm.urlName = input[1];

            var urlParamsRegexp = /\{([a-zA-Z1-9]+)\}/g;
            var urlParams = getMatches(route.url, urlParamsRegexp);

            var o = {};
            var object = {
                'x-swagger-router-controller': controller,
                'operationId': 'method',
                'tags': ['TAG'],
                "responses": {
                    "200": {
                        "description": "Return 200 status if success."
                    }
                }
            };


            // path params
            if(urlParams.length){
                object['parameters'] = _.map(urlParams, function(o){
                    return {
                        "name": o,
                        "in": "path",
                        "type": "string"
                    }
                })
            }

            if(method.toUpperCase() == 'PUT' || method.toUpperCase() == 'POST'){
                var bodyParam = {
                    "name": "name",
                    "in": "body",
                    "required": true,
                    "schema": {
                        "properties": {
                            "name": {
                                "type": "string"
                            },
                            "description": {
                                "type": "string"
                            }
                        }
                    }
                };
                object['parameters'] = object['parameters'] || [];
                object['parameters'].push(bodyParam);
            }

            o[method] = object;




            ///
            vm.object = o;
            vm.obj = vm.object[method];
        }


        function getMatches(string, regex) {
            var arr = [], match;
            while ((match = regex.exec(string)) !== null) {
                arr.push(match[1]);
            }
            return arr;
        }
    });