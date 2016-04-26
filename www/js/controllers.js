angular.module('app.controllers', [])

.controller('cameraTabDefaultPageCtrl', function($scope) {
    var socket = io('http://localhost:8080');

    // Receive calendar update from server and display it
    socket.on('time', function(time){
        $scope.currentTime = time;
    });

    $scope.getTime = function(){
        socket.emit('getTime');
    };
})

.controller('cartTabDefaultPageCtrl', function($scope) {

})

.controller('cloudTabDefaultPageCtrl', function($scope) {

})
