myApp.controller('addJobController', ['$scope', '$http', function ($scope, $http) {
  console.log('in addJobController');

  $scope.addjob = function () {
    console.log('in addjob');
    $http({
      method: 'POST',
      url: '/newjob'
    }).then(function(results){
      console.log('made it to then');
      
    });
  };

}]);
