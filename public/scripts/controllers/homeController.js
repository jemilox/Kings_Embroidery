
myApp.constant('moment', moment);

myApp.controller('homeController', ['$scope', '$http', 'moment', function ($scope, $http, moment){
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



    $scope.getAll = function () {
      console.log('in getall');
      //clear data


      $http({
        method: 'GET',
        url: '/all',
      }).then(function(results){
        console.log('made it to then');
        console.log('results.success', results.data);
        //array of alljobs from db
        $scope.alljobs = results.data;
        $scope.alljobs = $scope.alljobs.map(function (index) {
          var m = moment(index.duedate).format('M/D/YY');
          return {company: index.company, duedate: m, pieces: index.pieces};
        });//end map function
        //console.log($scope.alljobs);
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
          }
        }



      });//end then
    };//end getAll function

    $scope.getAll();

}]);
