myApp.constant('moment', moment);

myApp.controller('dayViewController', ['$scope', '$http', 'moment', 'factory', function ($scope, $http, moment, factory){
  console.log('in homeController');
  console.log('in dayViewController');

  $scope.currentDay = factory.currentDay();
  console.log('in dayview on ', $scope.currentDay);

  $scope.currentDayJobs = [];

  $scope.getAll = function () {
    console.log('in getall');
    //clear data
    factory.getAll().then(function(results){
      console.log('made it to then');
      console.log('results.success in day view', results.data);
      //array of alljobs from db
      $scope.alljobs = results.data;
      $scope.alljobs = $scope.alljobs.map(function (index) {
        var m = moment(index.duedate).format('M/D/YY');
        return {id: index.id, company: index.company, duedate: m, pieces: index.pieces, complete: index.complete, harddate: index.harddate};
      });//end map function
      //console.log($scope.alljobs);
      console.log('after map function', $scope.alljobs);
      //separate jobs by date
      for (var i = 0; i < $scope.alljobs.length; i++) {
        console.log('in if statement');
        if ($scope.alljobs[i].duedate === $scope.currentDay){
          $scope.currentDayJobs.push($scope.alljobs[i]);
        }//end if
        console.log('first for loop', $scope.currentDayJobs);
      }//end for loop
      console.log('in day view for loop', $scope.currentDayJobs);
      for (var j = 0; j < $scope.currentDayJobs.length; j++) {
        if($scope.currentDayJobs[j].harddate){
          var moveThis = $scope.currentDayJobs.splice(j, 1);
          $scope.currentDayJobs.unshift(moveThis[0]);
        }
      }

    });//end then
  };//end getAll function

  $scope.getAll();

}]);
