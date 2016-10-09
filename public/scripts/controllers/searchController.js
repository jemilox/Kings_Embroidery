
myApp.constant('moment', moment);

myApp.controller('searchController', ['$scope', '$http', 'moment', 'factory', function ($scope, $http, moment, factory){
  console.log('in Controller');

$scope.searchJobs = function () {
  console.log('in searchJobs click');

  var toSend = $scope.searchText;
  console.log(toSend);

  factory.searchForJobs(toSend).then(function (results) {
    console.log(results);
    $scope.searchedJobs = [];
    $scope.searchedJobs = results.data;
    $scope.searchedJobs = $scope.searchedJobs.map(function (index) {
      var m = moment(index.duedate).format('M/D/YY');
      return {id: index.id, company: index.company, duedate: m, pieces: index.pieces, complete: index.complete, harddate: index.harddate, notes: index.notes};
    });//end map function
    //console.log($scope.alljobs);
    console.log('after map function $scope.searchedJobs', $scope.searchedJobs);
  });
};



}]);
