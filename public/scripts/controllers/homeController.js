
myApp.constant('moment', moment);

myApp.controller('homeController', ['$scope', '$http', 'moment', function ($scope, $http, moment){
  console.log('in homeController');


    $scope.dateMonOne = moment().day(1).format('DD/MM')




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
          var m = moment(index.duedate).format('M/D/YYYY');
          return {company: index.company, duedate: m, pieces: index.pieces}
        });//end map function
        console.log($scope.alljobs);

      });//end then
    };//end getAll function

    $scope.getAll();

}]);
