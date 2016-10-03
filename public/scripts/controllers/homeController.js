myApp.controller('homeController', ['$scope', '$http', function ($scope, $http) {
  console.log('in homeController');


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

      });//end then
    };//end getAll function

    $scope.getAll();

}]);
