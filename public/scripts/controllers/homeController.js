
myApp.constant('moment', moment);

var socket = io();

myApp.controller('homeController', ['$scope', '$http', 'moment', 'factory', '$q', function ($scope, $http, moment, factory, $q){

  //weekOffset 0 means current week, negative is previous, positive is future
  var weekOffset = 0;


  $scope.changeWeekStatus = function (number) {
    weekOffset = weekOffset + number;
    $scope.dateMonOne = moment().day(1 + weekOffset * 14).format('M/D/YY');
    $scope.dateTuesOne = moment().day(2 + weekOffset * 14).format('M/D/YY');
    $scope.dateWedOne = moment().day(3 + weekOffset * 14).format('M/D/YY');
    $scope.dateThursOne = moment().day(4 + weekOffset * 14).format('M/D/YY');
    $scope.dateFriOne = moment().day(5 + weekOffset * 14).format('M/D/YY');
    $scope.dateMonTwo = moment().day(8 + weekOffset * 14).format('M/D/YY');
    $scope.dateTuesTwo = moment().day(9 + weekOffset * 14).format('M/D/YY');
    $scope.dateWedTwo = moment().day(10 + weekOffset * 14).format('M/D/YY');
    $scope.dateThursTwo = moment().day(11 + weekOffset * 14).format('M/D/YY');
    $scope.dateFriTwo = moment().day(12 + weekOffset * 14).format('M/D/YY');

    $scope.getAll();
  };


  $scope.futureJobs = [];
  $scope.alljobs = [];

  $scope.futureJobsfunction = function (thisJob) {
    //console.log('in futureJobs', thisJob.duedate, Date.parse(thisJob.duedate), $scope.dateFriTwo);
    var parsed = Date.parse(thisJob.duedate);
    var afterFriday = Date.parse($scope.dateFriTwo);
    if (parsed > afterFriday){
      $scope.futureJobs.push(thisJob);
      //console.log($scope.futureJobs);
    }
  };

  $scope.pastJobsfunction = function (thisJob) {
    //console.log('in past jobs function', thisJob);
    if(weekOffset === 0){
      var thisJobId = thisJob.id;
      var parsed = Date.parse(thisJob.duedate);
      var beforeMonday = Date.parse($scope.dateMonOne);
      if (!thisJob.complete){
        if(parsed < beforeMonday){
          factory.changeCurrentJobId(thisJobId);
          factory.editDate($scope.dateMonOne).then(function () {
            $scope.monOneJobs.push(thisJob);
          });

        }
      }
    }
  };

  $scope.getAll = function () {
    //clear data
    $scope.alljobs = [];
    factory.getAll().then(function(results){
      //array of alljobs from db
      $scope.alljobs = results.data;
      $scope.alljobs = $scope.alljobs.map(function (index) {
        var m = moment.utc(index.duedate).format('M/D/YY');
        return {id: index.id, company: index.company, duedate: m, pieces: index.pieces, complete: index.complete, harddate: index.harddate, inprogress: index.inprogress, notes: index.notes};
      });

          $scope.monOneJobs = [];
          $scope.tuesOneJobs = [];
          $scope.wedOneJobs = [];
          $scope.thursOneJobs = [];
          $scope.friOneJobs = [];
          $scope.monTwoJobs = [];
          $scope.tuesTwoJobs = [];
          $scope.wedTwoJobs = [];
          $scope.thursTwoJobs = [];
          $scope.friTwoJobs = [];
          $scope.futureJobs = [];

          $scope.allJobArrays = [$scope.monOneJobs, $scope.tuesOneJobs, $scope.wedOneJobs, $scope.thursOneJobs,
            $scope.friOneJobs, $scope.monTwoJobs, $scope.tuesTwoJobs, $scope.wedTwoJobs, $scope.thursTwoJobs,
            $scope.friTwoJobs];
      //separate jobs by date
      for (var i = 0; i < $scope.alljobs.length; i++) {
        switch($scope.alljobs[i].duedate){
          case $scope.dateMonOne:
            $scope.monOneJobs.push($scope.alljobs[i]);
            break;
          case $scope.dateTuesOne:
            $scope.tuesOneJobs.push($scope.alljobs[i]);
            break;
          case $scope.dateWedOne:
            $scope.wedOneJobs.push($scope.alljobs[i]);
            break;
          case $scope.dateThursOne:
            $scope.thursOneJobs.push($scope.alljobs[i]);
            break;
          case $scope.dateFriOne:
            $scope.friOneJobs.push($scope.alljobs[i]);
            break;
          case $scope.dateMonTwo:
            $scope.monTwoJobs.push($scope.alljobs[i]);
            break;
          case $scope.dateTuesTwo:
            $scope.tuesTwoJobs.push($scope.alljobs[i]);
            break;
          case $scope.dateWedTwo:
            $scope.wedTwoJobs.push($scope.alljobs[i]);
            break;
          case $scope.dateThursTwo:
            $scope.thursTwoJobs.push($scope.alljobs[i]);
            break;
          case $scope.dateFriTwo:
            $scope.friTwoJobs.push($scope.alljobs[i]);
            break;
          default:
            $scope.futureJobsfunction($scope.alljobs[i]);
            $scope.pastJobsfunction($scope.alljobs[i]);
        }//end switch
      }//end for loop
    });//end then
  };//end getAll function

  //delete job
  $scope.delete = function (id) {
    var objectToSend = {
      id: id
    };

    factory.deletejob(objectToSend).then(function (results) {
      $scope.getAll();
    });
  };//end delete

  //go to edit, tell which job to edit
  $scope.updateThis = function (id) {
    factory.changeCurrentJobId(id);
  };

  //got to factory, tell which is currentDay
  $scope.updateDay = function (id) {
    factory.changeCurrentDay(id);
  };

  $scope.compareComplete = function (arg) {
    return arg.complete === true;
  };

  $scope.compareHardDate = function (arg) {
    return arg.harddate === false;
  };

  $scope.compareDueDate = function (arg) {
    return Date.parse(arg.duedate);
  };

  // //complete function update complete status
  $scope.jobComplete = function (id) {
    factory.changeCurrentJobId(id);
    for (var k = 0; k < $scope.alljobs.length; k++) {
      if($scope.alljobs[k].id == id){
        var sendtrue = $scope.alljobs[k].complete;
        factory.editComplete(sendtrue).then(function () {
          $scope.getAll();

        });
      }
    }

  };

 $scope.jobInProgress = function (jobid) {
   factory.changeCurrentJobId(jobid);
   for (var k = 0; k < $scope.alljobs.length; k++) {
     if($scope.alljobs[k].id == jobid){
       var sendtrue = $scope.alljobs[k].inprogress;
       factory.editInProgress(sendtrue).then(function () {
         $scope.getAll();
       });
     }
   }
 };
  //run get all at page load
  $scope.changeWeekStatus(0);
  $scope.getAll();

  socket.on('pingRefresh', function () {
    $scope.getAll();
  });


}]);//end controller
