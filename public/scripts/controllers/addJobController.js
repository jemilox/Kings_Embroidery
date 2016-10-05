
myApp.constant('moment', moment);

myApp.controller('addJobController', ['$scope', '$http', 'moment', function ($scope, $http, moment) {
  console.log('in addJobController');
  //clear scope.success for ng-show
  $scope.success = false;

  // var m = moment();
  // console.log(m);
  //
  // var c =moment().day(5).format('DD MM');
  // console.log(c);


  $scope.addjob = function () {
    console.log('in addjob');

    var objectToSend = {
      company : $scope.company,
      duedate : $scope.duedate,
      pieces: $scope.pieces,
      complete: false,
      harddate: $scope.harddate,
      notes: $scope.notes

    };//end objectToSend

    $scope.company = "";
    $scope.pieces = "";
    $scope.duedate = "";
    $scope.harddate = "";
    $scope.notes = "";


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
        $scope.date = moment(objectToSend.duedate).format('MM/DD/YY');
        $scope.number = objectToSend.pieces;
        $scope.complete = false;
        $scope.harddate = objectToSend.harddate;
        $scope.notes = objectToSend.notes;
        $scope.success = true;

      }//end if
    });//end then
  };//end addjob function

}]);//end controller
