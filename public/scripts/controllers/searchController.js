
myApp.constant('moment', moment);

myApp.controller('searchController', ['$scope', '$http', 'moment', 'factory', function ($scope, $http, moment, factory){

$scope.searchJobs = function () {
  var toSend = $scope.searchText;
  if($scope.dateSearchFirst === undefined && $scope.dateSearchSecond === undefined){

    factory.searchForJobs(toSend).then(function (results) {
      $scope.searchedJobs = [];
      $scope.tripleSearchedJobs = [];
      $scope.searchedJobs = results.data;
      $scope.searchedJobs = $scope.searchedJobs.map(function (index) {
        var m = moment.utc(index.duedate).format('M/D/YY');
        return {id: index.id, company: index.company, duedate: m, pieces: index.pieces, complete: index.complete, harddate: index.harddate, notes: index.notes};
      });//end map function
      //console.log($scope.alljobs);
      //console.log('search parse', Date.parse($scope.searchedJobs[0].duedate));
    });
  }else if ($scope.dateSearchFirst === undefined || $scope.dateSearchSecond === undefined){
    alert('Date missing');
  }else if($scope.searchText === undefined && $scope.dateSearchFirst !== undefined && $scope.dateSearchSecond !== undefined){
    //search by date only
    factory.getAll().then(function (response) {
      $scope.tripleSearchedJobs = response.data;
      $scope.tripleSearchedJobs = $scope.tripleSearchedJobs.map(function (index) {
        var m = moment.utc(index.duedate).format('M/D/YY');
        return {id: index.id, company: index.company, duedate: m, pieces: index.pieces, complete: index.complete, harddate: index.harddate, notes: index.notes};
      });//end map function
      $scope.tripleSearchedJobs = $scope.tripleSearchedJobs.filter($scope.filterByDate);
    });
  }else{
    factory.searchForJobs(toSend).then(function (results) {
      $scope.tripleSearchedJobs = [];
      $scope.searchedJobs = [];
      $scope.tripleSearchedJobs = results.data;
      $scope.tripleSearchedJobs = $scope.tripleSearchedJobs.map(function (index) {
        var m = moment.utc(index.duedate).format('M/D/YY');
        return {id: index.id, company: index.company, duedate: m, pieces: index.pieces, complete: index.complete, harddate: index.harddate, notes: index.notes};
      });//end map function
      $scope.tripleSearchedJobs = $scope.tripleSearchedJobs.filter($scope.filterByDate);
      //console.log('search parse', Date.parse($scope.searchedJobs[0].duedate));
    });
  }
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

$scope.filterByDate = function (arg) {
  var jobDate = Date.parse(arg.duedate);
  var firstDate = Date.parse($scope.dateSearchFirst);
  var secondDate = Date.parse($scope.dateSearchSecond);

  return jobDate >= firstDate && jobDate <= secondDate;

};

$scope.jobComplete = function (id) {
  factory.changeCurrentJobId(id);
  for (var k = 0; k < $scope.searchedJobs.length; k++) {
    if($scope.searchedJobs[k].id == id){
      var sendtrue = $scope.searchedJobs[k].complete;
      factory.editComplete(sendtrue).then(function () {
        $scope.searchJobs();

      });
    }
  }
};

}]);
