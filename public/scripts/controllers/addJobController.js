
myApp.constant('moment', moment);

myApp.controller('addJobController', ['$scope', '$http', 'moment', function ($scope, $http, moment) {
  console.log('in addJobController');
  //clear scope.success for ng-show
  $scope.success = false;

  var m = moment();
  console.log(m);

  var c =moment().day(5).format('DD MM');
  console.log(c);


  $scope.addjob = function () {
    console.log('in addjob');

    var objectToSend = {
      company : $scope.company,
      duedate : $scope.duedate,
      pieces: $scope.pieces
    };//end objectToSend

    console.log('objectToSend', objectToSend);

    $http({
      method: 'POST',
      url: '/newjob',
      data: objectToSend
    }).then(function(results){
      console.log('made it to then');
      console.log('results.success', results.data.success);
      if (results.data.success){
        $scope.job = objectToSend.company;
        $scope.duedate = objectToSend.duedate;
        $scope.pieces = objectToSend.pieces;
        $scope.success = true;

      }//end if
    });//end then
  };//end addjob function

}]);//end controller
