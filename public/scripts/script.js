console.log('sourced');

var myApp = angular.module('myApp', ['ngRoute']);

//home controller
myApp.controller('home', ['$scope', '$http', function ($scope, $http) {
  console.log('in home controller');
}]);

myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
  when ('/addjob', {
    templateUrl: "views/addjobview.html",
    controller: "addJobController"
  }).
  when ('/home', {
    templateUrl: "views/home.html",
    controller: "homeController"
  }).
  otherwise({
    redirectTo: "/home"
  });
}]);
