angular.module('swaggedit')
    .controller('generatorController', function ($window) {

        var vm = this;

        vm.TYPES = ['string', 'integer'];

        vm.parse = parse;
        vm.addParam = addParam;
        vm.saveTag = saveTag;

        vm.CURRENT_TAG = $window.localStorage.generatorTag || 'TAG';

        vm.urlName = '';
        vm.object = {};

        vm.param = '';

        vm.newRoute = {};
        //vm.newRoute.url = 'put /asdf/{is}';

        parse(vm.newRoute);

        var object, o;

        vm.params = [];

        var bodyIndex = 0;

        // implementation

        function saveTag(){
            $window.localStorage.generatorTag = vm.CURRENT_TAG;
        }

        function parse(route) {
            if(!route.url) return;

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

            o = {};
            object = {
                'x-swagger-router-controller': controller,
                'operationId': 'method',
                'tags': [angular.copy(vm.CURRENT_TAG)],
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
                        "type": (o.toLowerCase().indexOf('id') >= 0)? "integer" : "string"
                    }
                });
                bodyIndex = urlParams.length;
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

                vm.params = [];

                bodyParam.schema.properties = parseParams();

                object['parameters'] = object['parameters'] || [];
                object['parameters'].push(bodyParam);
            }

            o[method] = object;




            ///
            vm.object = o;
            vm.obj = vm.object[method];
        }


        function addParam(param){
            param = param.trim().split(" ");
            vm.param = '';
            vm.params.push({name: param[0], type: param[1]});
            object.parameters[bodyIndex].schema.properties = parseParams();
        }

        function parseParams(){
            var o = {};
            vm.params.forEach(function (p) {
                o[p.name] = {
                    "type": p.type
                };
            });
            return o;
        }

        function getMatches(string, regex) {
            var arr = [], match;
            while ((match = regex.exec(string)) !== null) {
                arr.push(match[1]);
            }
            return arr;
        }
    });