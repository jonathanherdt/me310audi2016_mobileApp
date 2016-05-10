angular.module('app.controllers', [])

.controller('usersCtrl', function($scope, socket, $state) {

	$scope.localIdentifier = socket.getLocalIdentifier();

	socket.on('user list', function(userlist) {
		$scope.users = userlist
	});

	$scope.$on("$ionicView.enter", function(event, data){
		socket.emit('app - get users');
	});

	$scope.editUser = function(key) {
		if (key !== socket.getLocalIdentifier()) return;

		$state.go("tabsController.userConfiguration");
	}
})

.controller('myDayCtrl', function($scope) {
    $scope.slideOptions = {
        direction: 'vertical'
    }
})

.controller('userConfigurationCtrl', function($scope, socket) {

	$scope.loggedOnUser = "[none]"

	socket.on('app - go to url', function(url) {
        window.open(url, '_blank', 'location=no');
		socket.emit('check login state');
	});

	socket.on('user authenticated', function (user) {
		$scope.loggedOnUser = user.name
	})

	socket.on('user not authenticated', function (id) {
		setTimeout(function () {
			socket.emit('check login state');
	    }, 1000);
	})

	$scope.$on("$ionicView.enter", function(event, data){
		socket.emit('check login state');
	});

	$scope.connectToGoogle = function(primaryTransportation, secondaryTransportation){
		socket.emit('app - create new user', [primaryTransportation, secondaryTransportation]);
    }
})

.controller('transitOptionsCtrl', function($scope) {

})
