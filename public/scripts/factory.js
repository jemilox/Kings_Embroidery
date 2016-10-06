myApp.factory('factory', ['$http', function($http){
  console.log('in factory');

  var currentJobId = "";
  var currentDay = "";

  var getAll = function () {

    return $http({
      method: 'GET',
      url: '/all',
    });
  };

  var deletejob = function (objectToSend) {

    return $http({
      method: 'DELETE',
      url: '/delete',
      data: objectToSend,
      headers: {"Content-Type": "application/json;charset=utf-8"}
    });

  };

  var changeCurrentJobId = function (id) {
    currentJobId = id;
    console.log('this id is', id);
  };

  var changeCurrentDay = function (id) {
    currentDay = id;
    console.log('the current day is', currentDay);
  };

  var editPieces = function (number) {

    var objectToSend = {
      id: currentJobId,
      pieces: number
    };

    return $http({
      method: 'POST',
      url: '/edit',
      data: objectToSend
    });
  };

  var editHarddate = function (number) {
    console.log(number);
    var objectToSend = {
      id: currentJobId,
      harddate: number
    };

    return $http({
      method: 'POST',
      url: '/editharddate',
      data: objectToSend
    });
  };

  var editComplete = function (number) {

    var objectToSend = {
      id: currentJobId,
      complete: number
    };

    return $http({
      method: 'POST',
      url: '/editcomplete',
      data: objectToSend
    });
  };

  var editNotes = function (number) {

    var objectToSend = {
      id: currentJobId,
      notes: number
    };

    return $http({
      method: 'POST',
      url: '/editnotes',
      data: objectToSend
    });
  };

  var editCompany = function (number) {

    var objectToSend = {
      id: currentJobId,
      company: number
    };

    return $http({
      method: 'POST',
      url: '/editcompany',
      data: objectToSend
    });
  };

  var editDate = function (number) {

    var objectToSend = {
      id: currentJobId,
      duedate: number
    };

    return $http({
      method: 'POST',
      url: '/editdate',
      data: objectToSend
    });
  };


  return {
    getAll: getAll,
    deletejob: deletejob,
    changeCurrentJobId: changeCurrentJobId,
    currentJobId: function () {
      return currentJobId;
    },
    editPieces: editPieces,
    editDate: editDate,
    editCompany: editCompany,
    editNotes: editNotes,
    editComplete: editComplete,
    editHarddate: editHarddate,
    currentDay: function () {
      return currentDay;
    },
    changeCurrentDay: changeCurrentDay
  };

}]);
