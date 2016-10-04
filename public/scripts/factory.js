myApp.factory('factory', ['$http', function($http){
  console.log('in factory');

  var hereIam = function () {
    console.log('made it here to factory');
  };

  return {
    hereIam: hereIam
  };

}]);
