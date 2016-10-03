myApp.controller('addJobController', ['$scope', '$http', function ($scope, $http) {
  console.log('in addJobController');




  $scope.addjob = function () {
    console.log('in addjob');

    var objectToSend = {
      company : $scope.company,
      duedate : $scope.duedate,
      pieces: $scope.pieces
    };

    console.log('objectToSend', objectToSend);

    $http({
      method: 'POST',
      url: '/newjob',
      data: objectToSend
    }).then(function(results){
      console.log('made it to then');

    });
  };

}]);
