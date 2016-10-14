
myApp.constant('moment', moment);

myApp.controller('searchController', ['$scope', '$http', 'moment', 'factory', function ($scope, $http, moment, factory){
  console.log('in Controller');

$scope.searchJobs = function () {
  console.log('in searchJobs click');

  var toSend = $scope.searchText;
  console.log(toSend);

  if($scope.dateSearchFirst === undefined && $scope.dateSearchSecond === undefined){

    factory.searchForJobs(toSend).then(function (results) {


      console.log(results);
      $scope.searchedJobs = [];
      $scope.tripleSearchedJobs = [];
      $scope.searchedJobs = results.data;
      $scope.searchedJobs = $scope.searchedJobs.map(function (index) {
        var m = moment.utc(index.duedate).format('M/D/YY');
        return {id: index.id, company: index.company, duedate: m, pieces: index.pieces, complete: index.complete, harddate: index.harddate, notes: index.notes};
      });//end map function
      //console.log($scope.alljobs);
      console.log('after map function $scope.searchedJobs', $scope.searchedJobs);
      //console.log('search parse', Date.parse($scope.searchedJobs[0].duedate));
    });
  }else if ($scope.dateSearchFirst === undefined || $scope.dateSearchSecond === undefined){
    alert('Date missing');
  }else{
    factory.searchForJobs(toSend).then(function (results) {

      console.log(results);
      $scope.tripleSearchedJobs = [];
      $scope.searchedJobs = [];
      $scope.tripleSearchedJobs = results.data;
      $scope.tripleSearchedJobs = $scope.tripleSearchedJobs.map(function (index) {
        var m = moment.utc(index.duedate).format('M/D/YY');
        return {id: index.id, company: index.company, duedate: m, pieces: index.pieces, complete: index.complete, harddate: index.harddate, notes: index.notes};
      });//end map function
      //console.log($scope.alljobs);
      $scope.tripleSearchedJobs = $scope.tripleSearchedJobs.filter($scope.filterByDate)
      console.log('after map function $scope.searchedJobs', $scope.tripleSearchedJob);
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
  console.log('in jobComplete click', id);
  factory.changeCurrentJobId(id);
  for (var k = 0; k < $scope.searchedJobs.length; k++) {
    if($scope.searchedJobs[k].id == id){
      console.log($scope.searchedJobs[k]);
      var sendtrue = $scope.searchedJobs[k].complete;
      factory.editComplete(sendtrue).then(function () {
        console.log('made it to then');
        $scope.searchJobs();

      });
    }
  }

};



}]);
