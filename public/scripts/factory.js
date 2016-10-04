myApp.factory('factory', ['$http', function($http){
  console.log('in factory');

  var hereIam = function () {
    console.log('made it here to factory');
  };

  var getAll = function () {

    return $http({
      method: 'GET',
      url: '/all',
    });
  };





  return {
    hereIam: hereIam,
    getAll: getAll
  };

}]);
