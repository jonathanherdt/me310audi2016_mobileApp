angular.module('app.controllers', [])

.controller('usersCtrl', function($scope, socket) {
	socket.on('user list', function(userlist) {
		$scope.users = userlist
	});

	socket.emit('app - get users');
})

.controller('myDayCtrl', function($scope) {
    $scope.slideOptions = {
        direction: 'vertical'
    }
})

.controller('userConfigurationCtrl', function($scope, socket) {

	socket.on('app - go to url', function(url) {
		$scope.connectToGoogle = function(){
        	window.open(url, '_blank', 'location=no');
    }
	});

	socket.on('user authenticated', function (user) {
		console.log('calendar connected: ' + user.name);
	})

	socket.on('user not authenticated', function (id) {
		setTimeout(function () {
			socket.emit('check login state');
	    }, 1000);
	})

	socket.emit('app - create new user');
	socket.emit('check login state');
})

.controller('transitOptionsCtrl', function($scope) {

})
