angular.module('app.controllers', [])

.controller('usersCtrl', function($scope, socket) {
	socket.on('user list', function(userlist) {
		$scope.users = userlist
	});

	socket.emit('app - get users');
	console.log('emitted');
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
