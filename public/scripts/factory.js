myApp.factory('factory', ['$http', function($http){
  console.log('in factory');

  var currentJobId = "";

  var hereIam = function () {
    console.log('made it here to factory');
  };

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
    hereIam: hereIam,
    getAll: getAll,
    deletejob: deletejob,
    changeCurrentJobId: changeCurrentJobId,
    currentJobId: function () {
      return currentJobId;
    },
    editPieces: editPieces,
    editDate: editDate,
    editCompany: editCompany
  };

}]);
