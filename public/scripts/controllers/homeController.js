
myApp.constant('moment', moment);

var socket = io();

myApp.controller('homeController', ['$scope', '$http', 'moment', 'factory', '$q', function ($scope, $http, moment, factory, $q){
  console.log('in homeController');


  $scope.dropDownContent = false;

  $scope.dateMonOne = moment().day(1).format('M/D/YY');
  $scope.dateTuesOne = moment().day(2).format('M/D/YY');
  $scope.dateWedOne = moment().day(3).format('M/D/YY');
  $scope.dateThursOne = moment().day(4).format('M/D/YY');
  $scope.dateFriOne = moment().day(5).format('M/D/YY');
  $scope.dateMonTwo = moment().day(8).format('M/D/YY');
  $scope.dateTuesTwo = moment().day(9).format('M/D/YY');
  $scope.dateWedTwo = moment().day(10).format('M/D/YY');
  $scope.dateThursTwo = moment().day(11).format('M/D/YY');
  $scope.dateFriTwo = moment().day(12).format('M/D/YY');

  $scope.futureJobs = [];
  $scope.alljobs = [];

  $scope.futureJobsfunction = function (thisJob) {
    console.log('in futureJobs', thisJob.duedate, Date.parse(thisJob.duedate), $scope.dateFriTwo);
    var parsed = Date.parse(thisJob.duedate);
    var afterFriday = Date.parse($scope.dateFriTwo);
    if (parsed > afterFriday){
      $scope.futureJobs.push(thisJob);
      console.log($scope.futureJobs);
    }
  };

  $scope.getAll = function () {
    console.log('in getall');
    //clear data
    $scope.alljobs = [];
    factory.getAll().then(function(results){
      console.log('made it to then');
      console.log('results.success', results.data);
      //array of alljobs from db
      $scope.alljobs = results.data;
      $scope.alljobs = $scope.alljobs.map(function (index) {
        var m = moment.utc(index.duedate).format('M/D/YY');
        return {id: index.id, company: index.company, duedate: m, pieces: index.pieces, complete: index.complete, harddate: index.harddate};
      });//end map function
      console.log($scope.alljobs);

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
        }//end switch
      }//end for loop

      console.log($scope.monOneJobs);
    });//end then
  };//end getAll function

  //delete job
  $scope.delete = function (id) {
    console.log('in delete', id);

    var objectToSend = {
      id: id
    };

    factory.deletejob(objectToSend).then(function (results) {
      console.log('made it to results!');
      $scope.getAll();
    });
  };//end delete

  //go to edit, tell which job to edit
  $scope.updateThis = function (id) {
    console.log('ng click works');
    factory.changeCurrentJobId(id);
  };

  //got to factory, tell which is currentDay
  $scope.updateDay = function (id) {
    console.log('updateDay click works');
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

  $scope.windowClick = function(event) {
    console.log('in window click');
    if ($scope.dropDownContent){
      console.log('mew');
      $scope.dropDownContent = false;
    }

  };

  var droppedDown = false;

  $scope.dropDown = function () {
    var timer = function(){
      return $q(function(resolve, reject){
        setTimeout(function () {
          resolve();
        }, 50);
      });
    };
    timer().then(function(){
      if (droppedDown) {
        droppedDown = false;
      }
      else {
        $scope.dropDownContent = true;
        droppedDown = true;
      }
      console.log('in dropDown click');
    });
  };

  // //complete function update complete status
  $scope.jobComplete = function (id) {
    console.log('in jobComplete click', id);
    factory.changeCurrentJobId(id);
    for (var k = 0; k < $scope.alljobs.length; k++) {
      if($scope.alljobs[k].id == id){
        console.log($scope.alljobs[k]);
        var sendtrue = $scope.alljobs[k].complete;
        factory.editComplete(sendtrue).then(function () {
          console.log('made it to then');
          $scope.getAll();

        });
      }
    }

  };


  //run get all at page load
  $scope.getAll();

  socket.on('pingRefresh', function () {
    $scope.getAll();
  });


}]);//end controller
