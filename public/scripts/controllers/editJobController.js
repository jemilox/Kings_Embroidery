
myApp.constant('moment', moment);

myApp.controller('editJobController', ['$scope', '$http', 'moment', 'factory', function ($scope, $http, moment, factory){
  console.log('in editJobController');

  var jobId = factory.currentJobId();

  //set ng-show to false on each
  $scope.editCo = false;
  $scope.editD = false;
  $scope.editPi = false;

  $scope.company = '';

  //get all from factory find job from id that was clicked
  factory.getAll().then(function (results) {
    $scope.allJobs = results.data;
    console.log('in edit getAll results', $scope.allJobs);
    for (var i = 0; i < $scope.allJobs.length; i++) {
      //console.log('in for loop');
      //console.log($scope.allJobs[i].id);
      //console.log(jobId);
      if ($scope.allJobs[i].id === jobId){
        $scope.company = $scope.allJobs[i].company;
        $scope.pieces = $scope.allJobs[i].pieces;
        $scope.duedate = moment($scope.allJobs[i].duedate).format('M/D/YY');
        console.log('meow', $scope.company);
      }
    }
  });
  //show edit fields if clicked
  $scope.editButtonsCo = function () {
    console.log('in editButtonsCo');
    $scope.editCo = true;
  };
  $scope.editButtonsPi = function () {
    console.log('in editButtonsPi');
    $scope.editPi = true;
  };
  $scope.editButtonsDate = function () {
    console.log('in editButtonsDate');
    $scope.editD = true;
  };

  $scope.editPieces = function () {
    console.log('edit this', $scope.editPiecesmodel);

    factory.editPieces($scope.editPiecesmodel).then(function (results) {
      console.log('made it back from edit');
    });

  };

  $scope.editCompany = function () {
    console.log('edit this', $scope.editCompanymodel);

    factory.editCompany($scope.editCompanymodel).then(function (results) {
      console.log('made it back from edit');
    });

  };

  $scope.editDate = function () {
    console.log('edit this', $scope.editDueDatemodel);

    factory.editDate($scope.editDueDatemodel).then(function (results) {
      console.log('made it back from edit');
    });

  };//end editDate

}]);//end controller
