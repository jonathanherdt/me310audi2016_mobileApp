angular.module('app.controllers', [])

.controller('usersCtrl', function($scope, socket) {
	socket.on('user list', function(userlist) {
		$scope.users = userlist
	});

	socket.emit('app - get users');
})

.controller('myDayCtrl', function($scope) {

})

.controller('userConfigurationCtrl', function($scope, socket) {
	socket.emit('app - create new user');

	socket.on('app - go to url', function(url) {
		$scope.connectToGoogle = function(){
        	window.open(url, '_blank', 'location=no');
    }
	});
})

.controller('transitOptionsCtrl', function($scope) {

})
