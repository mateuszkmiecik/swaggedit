angular.module("swaggedit",["ui.materialize","ui.router"]),angular.module("swaggedit").config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("main",{url:"/",templateUrl:"app/partials/main/index.html",controller:"mainController",controllerAs:"vmc"}).state("generator",{url:"/generator",templateUrl:"app/partials/generator/generator.html",controller:"generatorController",controllerAs:"generator"}),b.otherwise("/")}]),angular.module("swaggedit").directive("configurator",function(){return{restrict:"E",replace:!0,templateUrl:"app/directives/configurator/index.html"}}).controller("configuratorController",["specService","configuratorService",function(a,b){var c=this;c.current=b.current,c.spec=a.spec,c.showSpec=!1,c.toggleSpec=function(){c.showSpec=!c.showSpec}}]).factory("configuratorService",function(){var a={};return a.current={template:"default"},a.setConfig=function(b){a.current.template=b},a.setPath=function(b){a.current.path=b},a}),angular.module("swaggedit").controller("editPathController",["$scope","configuratorService",function(a,b){a.current=b.current}]),angular.module("swaggedit").controller("newPathFormController",["$scope","pathsParser","configuratorService",function(a,b,c){a.found=!1,a.checkPath=function(){a.found=b.pathsKeys.indexOf(a.newPath.url)>=0},a.add=function(a){},a.edit=function(a){var d=b.paths,e=_.find(d.paths,{name:a.url});c.setPath(e),c.setConfig("editPath")}}]),angular.module("swaggedit").directive("generalConfigurator",function(){return{restrict:"E",replace:!0,templateUrl:"app/directives/general-configurator/index.html"}}).controller("generalConfiguratorController",["specService",function(a){var b=this;b.spec=a.spec}]),angular.module("swaggedit").directive("loader",function(){return{}}),angular.module("swaggedit").directive("loader",function(){return{restrict:"E",replace:!0,templateUrl:"app/directives/loader/loader.html"}}),angular.module("swaggedit").directive("pathsConfigurator",function(){return{restrict:"E",replace:!0,templateUrl:"app/directives/paths-configurator/index.html"}}).controller("pathsConfiguratorController",["specService","configuratorService","pathsParser",function(a,b,c){var d=this,e=c.parse(a.spec.paths);d.paths=e.paths,d.newPath=function(){b.setConfig("newPathForm")},d.editPath=function(a){b.setPath(a),b.setConfig("editPath")}}]),angular.module("swaggedit").controller("mainController",["specService","$timeout",function(a,b){var c=this;c.loading=!0,c.spec=a.spec,a.init().then(function(){b(function(){c.loading=!1},500)})}]),angular.module("swaggedit").controller("generatorController",["$window",function(a){function b(){a.localStorage.generatorTag=g.CURRENT_TAG}function c(a){if(a.url){g.urlName="";var b=["get","post","put","delete"],c=a.url.split(" ");if(!(c.length<=1)){"/"!=c[1][0]&&(c[1]="/"+c[1],a.url=c.join(" "));var d=c[1].split("/"),k=d[1]||"controller";if(!(b.indexOf(c[0].toLowerCase())<0)){var l=c[0].toLowerCase();g.method=l,g.urlName=c[1];var m=/\{([a-zA-Z1-9]+)\}/g,n=f(a.url,m);if(i={},h={"x-swagger-router-controller":k,operationId:"method",tags:[angular.copy(g.CURRENT_TAG)],responses:{200:{description:"Return 200 status if success."}}},n.length&&(h.parameters=_.map(n,function(a){return{name:a,"in":"path",type:a.toLowerCase().indexOf("id")>=0?"integer":"string"}}),j=n.length),"PUT"==l.toUpperCase()||"POST"==l.toUpperCase()){var o={name:"name","in":"body",required:!0,schema:{properties:{name:{type:"string"},description:{type:"string"}}}};g.params=[],o.schema.properties=e(),h.parameters=h.parameters||[],h.parameters.push(o)}i[l]=h,g.object=i,g.obj=g.object[l]}}}}function d(a){a=a.trim().split(" "),g.param="",g.params.push({name:a[0],type:a[1]}),h.parameters[j].schema.properties=e()}function e(){var a={};return g.params.forEach(function(b){a[b.name]={type:b.type}}),a}function f(a,b){for(var c,d=[];null!==(c=b.exec(a));)d.push(c[1]);return d}var g=this;g.TYPES=["string","integer"],g.parse=c,g.addParam=d,g.saveTag=b,g.CURRENT_TAG=a.localStorage.generatorTag||"TAG",g.urlName="",g.object={},g.param="",g.newRoute={},c(g.newRoute);var h,i;g.params=[];var j=0}]),angular.module("swaggedit").controller("mainController",["specService","$timeout",function(a,b){var c=this;c.loading=!0,c.spec=a.spec,a.init().then(function(){b(function(){c.loading=!1},500)})}]),angular.module("swaggedit").factory("pathsParser",function(){function a(a){c.pathsKeys=Object.keys(a);var d={pathsKeys:Object.keys(a),paths:[]},e=[];return _.each(d.pathsKeys,function(c){var f={name:c,methods:[]};_.each(b,function(b){var d=a[c][b];if(void 0!=d){var g={name:b,details:d};f.methods.push(g),e=e.concat(d.tags)}}),d.paths.push(f)}),c.TAGS=_.unique(e),c.paths=d,d}var b=["get","put","post","delete"],c={METHODS:b,parse:a};return c}),angular.module("swaggedit").factory("specService",["$http","$q",function(a,b){function c(){var c=b.defer();return a.get("/spec").then(f,e).then(function(a){g.ready=!0,angular.copy(a,g.spec),d(),c.resolve(g.spec)}),c.promise}function d(){}function e(a){return angular.isObject(a.data)&&a.data.message?b.reject(a.data.message):b.reject("An unknown error occurred.")}function f(a){return a.data}var g={};return g.ready=!1,g.init=c,g.spec={},g}]);