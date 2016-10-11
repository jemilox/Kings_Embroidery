
myApp.constant('moment', moment);

myApp.controller('addJobController', ['$scope', 'factory', '$http', 'moment', function ($scope, factory, $http, moment) {
  console.log('in addJobController');
  //clear scope.success for ng-show
  $scope.success = false;
  $scope.empSuccess = false;
  $scope.archiveSuccess = false;
  $scope.allEmployees = [];

  // var m = moment();
  // console.log(m);
  //
  // var c =moment().day(5).format('DD MM');
  // console.log(c);
  //get all employees
  var getEmployees = function () {

    return factory.getEmployees().then(function (results) {
      //save get from factory into allJobs
      $scope.allEmployees = [];
      $scope.allEmployees = results.data;
      console.log('in edit allEmployees results', $scope.allEmployees);


    });
  };

  //edit name text
  $scope.archiveEmployee = function () {
    console.log('archiveEmployee', $scope.editArchivemodel);
    for (let i = 0; i < $scope.allEmployees.length; i++) {
      if($scope.allEmployees[i].name === $scope.editArchivemodel){
        factory.archiveEmployee($scope.allEmployees[i].empid).then( function(){
          $scope.archiveSuccess = true;
          $scope.employeeArchived = $scope.allEmployees[i].name;
          console.log('last console log', $scope.allEmployees[i]);
        });
      }
    }

  };

  $scope.addjob = function () {
    console.log('in addjob');

    var objectToSend = {
      company : $scope.company,
      duedate : $scope.duedate,
      pieces: $scope.pieces,
      complete: false,
      harddate: $scope.harddate || false,
      notes: $scope.notes

    };//end objectToSend

    $scope.company = "";
    $scope.pieces = "";
    $scope.duedate = "";
    $scope.harddate = "";
    $scope.notes = "";


    console.log('objectToSend', objectToSend);

    $http({
      method: 'POST',
      url: '/newjob',
      data: objectToSend
    }).then(function(results){
      console.log('made it to then');
      console.log('results.success', results.data.success);
      if (results.data.success){
        $scope.job = objectToSend.company;
        $scope.date = moment(objectToSend.duedate).format('MM/DD/YY');
        $scope.number = objectToSend.pieces;
        $scope.complete = false;
        $scope.harddate = objectToSend.harddate;
        $scope.notes = objectToSend.notes;
        $scope.success = true;

      }//end if
    });//end then
  };//end addjob function

  $scope.addEmployee = function () {
    console.log('in addEmployee');

    var objectToSend = {
      name : $scope.employee,

    };//end objectToSend

    $scope.employee = "";

    console.log('objectToSend', objectToSend);

    $http({
      method: 'POST',
      url: '/newemployee',
      data: objectToSend
    }).then(function(results){
      console.log('made it to then');
      console.log('results.success', results.data.success);

        $scope.employeeSelected = objectToSend.name;
        $scope.empSuccess = true;
    });//end then
  };//end addjob function

  getEmployees();

}]);//end controller
