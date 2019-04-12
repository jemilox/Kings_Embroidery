var myApp = angular.module('myApp', ['ngRoute'])
  .directive('dragMe', dragMe)
  .directive('dropOnMe', dropOnMe);

//home controller
myApp.controller('home', ['$scope', '$http', function ($scope, $http) {
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
  when ('/search', {
    templateUrl: "views/searchview.html",
    controller: "searchController"
  }).
  otherwise({
    redirectTo: "/home"
  });
}]);

//draggable stuff from https://stackoverflow.com/questions/42454576/implement-html5-drag-drop-in-angularjs
dragMe.$inject = [];

function dragMe() {
  var DDO = {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.prop('draggable', true);
      element.on('dragstart', function(event) {
        event.dataTransfer.setData('elementId', element.attr('id'));
        event.dataTransfer.setData('jobId', element.attr('data-job-id'));
      });
    }
  };
  return DDO;
}
dropOnMe.$inject = ['factory'];
function dropOnMe(factory) {
  var DDO = {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.on('dragover', function(event) {
        event.preventDefault();
      });
      element.on('drop', function(event) {
        event.preventDefault();
        var elementId = event.dataTransfer.getData("elementId");
        var jobId = event.dataTransfer.getData("jobId");
        var newDate = element.attr('data-date');
        element.append(document.getElementById(elementId));
        factory.changeCurrentJobId(jobId);
        factory.editDate(newDate);
      });
    }
  };
  return DDO;
}