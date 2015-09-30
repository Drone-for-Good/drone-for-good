

angular.module('drone.seekers', [])

.controller('SeekersController', function ($scope, $location, UserFactory) {
  //Make a seeker object a property of the scope
  $scope.seeker = {};

  //A method that makes an api call to fill the seeker object with the relevant
  //properties
  $scope.getProfile = function () {
    UserFactory.getProfile()
      .then(function (profile) {
        $scope.seeker = profile; 
      })
      .catch(function (error) {
        console.log(error);
      });
  }

<<<<<<< HEAD
  $scope.getProfile();
=======
  // $scope.getProfile();
>>>>>>> d236959f17b5d880b21d220539f10f3813762d99
  });
