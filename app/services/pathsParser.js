angular.module('swaggedit')
    .factory('pathsParser', function(){

        var METHODS = ["get", "put", "post", "delete"];


        var service = {
            METHODS: METHODS,
            parse: parse
        };

        function parse(paths){

            service.pathsKeys = Object.keys(paths);

            var o = {
                pathsKeys: Object.keys(paths),
                paths: []
            };

            var tags = [];

            _.each(o.pathsKeys, function(path){

                var p = {
                    name: path,
                    methods: []
                };

                _.each(METHODS, function(method){


                    var current = paths[path][method];
                    if(current != undefined) {
                        var m = {
                            name: method,
                            details: current
                        };
                        p.methods.push(m);
                        tags = tags.concat(current.tags);
                    }

                });

                o.paths.push(p);
            });

            service.TAGS = _.unique(tags);


            service.paths = o;
            return o;

        }

        return service;

        //"post": {
        //    "x-swagger-router-controller": "auth",
        //        "operationId": "authenticate",
        //        "tags": [
        //        "Public"
        //    ],
        //        "summary": "Authenticate for API access",
        //        "security": [],
        //        "parameters": [
        //        {
        //            "name": "credentials",
        //            "in": "body",
        //            "description": "Authentication credentials",
        //            "required": true,
        //            "schema": {
        //                "$ref": "#/definitions/Credentials"
        //            }
        //        }
        //    ],
        //        "responses": {
        //        "200": {
        //            "description": "Returns API token for authenticated API access",
        //                "schema": {
        //                "properties": {
        //                    "token": {
        //                        "type": "string",
        //                            "example": "5a2e8468-faf4-48d4-a43c-bd1d6657ee02"
        //                    }
        //                }
        //            }
        //        },
        //        "401": {
        //            "description": "Authentication failed."
        //        },
        //        "403": {
        //            "description": "Account has been locked."
        //        },
        //        "default": {
        //            "$ref": "#/responses/DefaultError"
        //        }
        //    }
        //}

    });