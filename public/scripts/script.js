console.log('sourced');

var myApp = angular.module('myApp', ['ngRoute']);

//home controller
myApp.controller('home', ['$scope', '$http', function ($scope, $http) {
  console.log('in home controller');
}]);

myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
  when ('/edit', {
    templateUrl: "views/editjobview.html",
    controller: "editJobController"
  }).
  when ('/addjob', {
    templateUrl: "views/addjobview.html",
    controller: "addJobController"
  }).
  when ('/home', {
    templateUrl: "views/home.html",
    controller: "homeController"
  }).
  when ('/day', {
    templateUrl: "views/dayview.html",
    controller: "dayViewController"
  }).
  otherwise({
    redirectTo: "/home"
  });
}]);
