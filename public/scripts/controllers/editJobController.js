

myApp.constant('moment', moment);

myApp.controller('editJobController', ['$scope', '$http', 'moment', 'factory', function ($scope, $http, moment, factory){
  console.log('in editJobController');
  //this is the job that was selected from another view and received from factory
  var jobId = factory.currentJobId();
  //save for other functions that need to change the job
  $scope.id = '';

  //set ng-show to false on each
  $scope.editCo = false;
  $scope.editD = false;
  $scope.editPi = false;
  $scope.editC = false;
  $scope.editH = false;
  $scope.editN = false;
  $scope.editNam = false;
  $scope.company = '';

  $scope.allJobs = [];
  $scope.allEmployees = [];
  $scope.activeEmployees = [];

  //get all from factory find job from id that was clicked
  var getAll = function () {

    return factory.getAll().then(function (results) {
      //save get from factory into allJobs
      $scope.allJobs = [];
      $scope.allJobs = results.data;
      console.log('in edit getAll results', $scope.allJobs);
      for (var i = 0; i < $scope.allJobs.length; i++) {
        //console.log('in for loop');
        //console.log($scope.allJobs[i].id);
        //console.log(jobId);
        if ($scope.allJobs[i].id === jobId){
          //save parts of the job to display on dom
          $scope.name = $scope.allJobs[i].name;
          $scope.id = $scope.allJobs[i].id;
          $scope.company = $scope.allJobs[i].company;
          $scope.pieces = $scope.allJobs[i].pieces;
          $scope.duedate = moment.utc($scope.allJobs[i].duedate).format('M/D/YY');
          $scope.complete = !!$scope.allJobs[i].complete;
          $scope.harddate = !!$scope.allJobs[i].harddate;
          $scope.notes = $scope.allJobs[i].notes;
          //console.log('meow', $scope.company);
          //console.log($scope.allJobs[i]);
        }
      }
    });
  };

  //get all from factory find job from id that was clicked
  var getEmployees = function () {

    return factory.getEmployees().then(function (results) {
      //save get from factory into allJobs
      $scope.allEmployees = [];
      $scope.activeEmployees = [];
      $scope.allEmployees = results.data;
      console.log('in edit allEmployees results', $scope.allEmployees);
      for (var i = 0; i < $scope.allEmployees.length; i++) {
        if (!$scope.allEmployees[i].archived){
          $scope.activeEmployees.push($scope.allEmployees[i]);
        }
      }
      console.log($scope.activeEmployees);

    });
  };

  getAll();
  getEmployees();
  //show edit fields if clicked
  $scope.editButtonsC = function () {
    console.log('in editButtonsC');
    $scope.editC = true;
  };
  //show edit fields if clicked
  $scope.editButtonsH = function () {
    console.log('in editButtonsH');
    $scope.editH = true;
  };
  //show edit fields if clicked
  $scope.editButtonsN = function () {
    console.log('in editButtonsN');
    $scope.editN = true;
  };
  //show edit fields if clicked
  $scope.editButtonsCo = function () {
    console.log('in editButtonsCo');
    $scope.editCo = true;
  };
  //show edit fields if clicked
  $scope.editButtonsPi = function () {
    console.log('in editButtonsPi');
    $scope.editPi = true;
  };
  //show edit fields if clicked
  $scope.editButtonsDate = function () {
    console.log('in editButtonsDate');
    $scope.editD = true;
  };
  //show edit fields if clicked
  $scope.editButtonsName = function () {
    console.log('in editButtonsName');
    $scope.editNam = true;
  };
  //edit notes text
  $scope.editNotes = function () {
    console.log('edit this', $scope.editNotesmodel);

    factory.editNotes($scope.editNotesmodel).then(function (results) {
      console.log('made it back from edit');
      $scope.editN = false;
    }).then( function(){
      getAll();
    });
  };

  //edit name text
  $scope.editName = function () {
    console.log('allEmployees', $scope.allEmployees);
    console.log('edit this', $scope.editNamemodel);
    for (var i = 0; i < $scope.allEmployees.length; i++) {
      if($scope.allEmployees[i].name === $scope.editNamemodel){
        factory.editName($scope.allEmployees[i].empid).then(function (results) {
          console.log('made it back from edit');
          $scope.editNam = false;
        }).then( function(){
          getAll();
        });
      }
    }

  };

  //edit harddate xt
  $scope.editHarddate = function () {
    console.log('edit this', $scope.editHarddatemodel);

    factory.editHarddate($scope.editHarddatemodel).then(function (results) {
      console.log('made it back from edit');
      $scope.editH = false;
    }).then( function(){
      getAll();
    });
  };
  //edit pieces complete
  $scope.editComplete = function () {
    console.log('edit this', $scope.editCompletemodel);

    factory.editComplete($scope.editCompletemodel).then(function (results) {
      console.log('made it back from edit');
      $scope.editC = false;
    }).then( function(){
      getAll();
    });
  };
  //edit pieces text
  $scope.editPieces = function () {
    console.log('edit this', $scope.editPiecesmodel);

    factory.editPieces($scope.editPiecesmodel).then(function (results) {
      console.log('made it back from edit');
      $scope.editPi = false;
    }).then( function(){
      getAll();
    });
  };

  //edit company text
  $scope.editCompany = function () {
    console.log('edit this', $scope.editCompanymodel);

    factory.editCompany($scope.editCompanymodel).then(function (results) {
      console.log('made it back from edit');
      $scope.editCo = false;
    }).then( function(){
      getAll();
    });//end factory call
  };//end edit company

  //edit date text
  $scope.editDate = function () {
    console.log('edit this', $scope.editDueDatemodel);

    factory.editDate($scope.editDueDatemodel).then(function (results) {
      console.log('made it back from edit');
      $scope.editD = false;
    }).then( function(){
      getAll();
    });//end factory call
  };//end editDate


  //delete job
  $scope.deleteJob = function () {
    console.log('in delete', $scope.id);
    var objectToSend = {
      id: $scope.id
    };
    factory.deletejob(objectToSend).then(function (response) {
      console.log('made it to then');
      //clear fields when deleted
      $scope.company = "";
      $scope.pieces = "";
      $scope.duedate = "";
      $scope.complete = "";
      $scope.harddate = "";
      $scope.notes = "";
    });
  };//end delete job

}]);//end controller
