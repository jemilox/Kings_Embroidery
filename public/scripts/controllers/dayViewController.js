myApp.constant('moment', moment);

myApp.controller('dayViewController', ['$scope', '$http', 'moment', 'factory', function ($scope, $http, moment, factory){
  console.log('in homeController');
  console.log('in dayViewController');

  $scope.currentDay = factory.currentDay();
  console.log('in dayview on ', $scope.currentDay);

}]);
