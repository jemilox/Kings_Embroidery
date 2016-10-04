
myApp.constant('moment', moment);

myApp.controller('homeController', ['$scope', '$http', 'moment', function ($scope, $http, moment){
  console.log('in homeController');

}]);//end controller
