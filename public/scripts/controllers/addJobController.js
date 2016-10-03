
myApp.constant('moment', moment);

myApp.controller('addJobController', ['$scope', '$http', 'moment', function ($scope, $http, moment) {
  console.log('in addJobController');

  var m = moment();
  console.log(m);


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
      console.log('results.success', results.data.success);
      if (results.data.success){
        $scope.success = true;
      }
    });
  };

}]);
