
myApp.constant('moment', moment);

myApp.controller('homeController', ['$scope', '$http', 'moment', 'factory', function ($scope, $http, moment, factory){
  console.log('in homeController');


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




  $scope.getAll = function () {
    console.log('in getall');
    //clear data
    factory.getAll().then(function(results){
      console.log('made it to then');
      console.log('results.success', results.data);
      //array of alljobs from db
      $scope.alljobs = results.data;
      $scope.alljobs = $scope.alljobs.map(function (index) {
        var m = moment(index.duedate).format('M/D/YY');
        return {id: index.id, company: index.company, duedate: m, pieces: index.pieces, complete: index.complete, harddate: index.harddate};
      });//end map function
      //console.log($scope.alljobs);

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
        }//end switch
      }//end for loop

      for (var x = 0; x < $scope.allJobArrays.length; x++) {
        for (var j = 0; j < $scope.allJobArrays[x].length; j++) {
          //console.log($scope.monOneJobs[j]);
          if($scope.allJobArrays[x][j].harddate){
            var moveThis = $scope.allJobArrays[x].splice(j, 1);
            //console.log('in for loop for monOneJobs', $scope.allJobArrays[x]);
            $scope.allJobArrays[x].unshift(moveThis[0]);
            //console.log('in for loop for monOneJobs', $scope.allJobArrays[x]);
          }//end if
        }//first for loop
      }//second for loop
      // $scope.monOneJobs = [];
      // $scope.tuesOneJobs = [];
      // $scope.wedOneJobs = [];
      // $scope.thursOneJobs = [];
      // $scope.friOneJobs = [];
      // $scope.monTwoJobs = [];
      // $scope.tuesTwoJobs = [];
      // $scope.wedTwoJobs = [];
      // $scope.thursTwoJobs = [];
      // $scope.friTwoJobs = [];


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

  //run get all at page load
  $scope.getAll();

}]);//end controller
