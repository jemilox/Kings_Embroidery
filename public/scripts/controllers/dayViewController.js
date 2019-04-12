myApp.constant('moment', moment);

var socket = io();

myApp.controller('dayViewController', ['$scope', '$http', 'moment', 'factory', function ($scope, $http, moment, factory){

  var m = moment().format('M/D/YY');

  $scope.currentDay = factory.currentDay();

  if (!$scope.currentDay){
    console.log('if statement', $scope.currentDay, m);
    $scope.currentDay = m;

  }

  $scope.currentDayJobs = [];

  $scope.getAll = function () {
    //clear data
    factory.getAll().then(function(results){
      $scope.currentDayJobs = [];
      //array of alljobs from db
      $scope.alljobs = results.data;
      $scope.alljobs = $scope.alljobs.map(function (index) {
        var m = moment.utc(index.duedate).format('M/D/YY');
        return {id: index.id, company: index.company, duedate: m, pieces: index.pieces, complete: index.complete, harddate: index.harddate, notes: index.notes, name: index.name};
      });//end map function
      //console.log($scope.alljobs);
      //separate jobs by date
      for (var i = 0; i < $scope.alljobs.length; i++) {
        //console.log('in if statement');
        if ($scope.alljobs[i].duedate === $scope.currentDay){
          $scope.currentDayJobs.push($scope.alljobs[i]);
        }//end if
        //console.log('first for loop', $scope.currentDayJobs);
      }//end for loop
      //console.log('in day view for loop', $scope.currentDayJobs);


    });//end then
  };//end getAll function

  $scope.updateThis = function (id) {
    factory.changeCurrentJobId(id);
  };

  $scope.delete = function (id) {

    var objectToSend = {
      id: id
    };

    factory.deletejob(objectToSend).then(function (results) {
      $scope.getAll();
    });
  };//end delete

  //get ng-model to tell if it is true or notes
  // //complete function update complete status
  $scope.jobComplete = function (id) {
    factory.changeCurrentJobId(id);
    for (var k = 0; k < $scope.currentDayJobs.length; k++) {
      if($scope.currentDayJobs[k].id == id){
        var sendtrue = $scope.currentDayJobs[k].complete;
        factory.editComplete(sendtrue).then(function () {
          $scope.getAll();

        });
      }
    }

  };
  //order by check for true or false on each array item
  $scope.compareComplete = function (arg) {
    return arg.complete === true;
  };

  $scope.compareHardDate = function (arg) {
    return arg.harddate === false;
  };

  socket.on('pingRefresh', function () {
    $scope.getAll();
  });

  $scope.getAll();

}]);
