angular.module('app.controllers', [])

.controller('usersCtrl', function($scope) {

})

.controller('myDayCtrl', function($scope) {

})

.controller('userConfigurationCtrl', function($scope) {
    $scope.connectToGoogle = function(){
        window.open('http://172.16.57.189:8080/', '_blank', 'location=no');
    }
})

.controller('transitOptionsCtrl', function($scope) {

})
