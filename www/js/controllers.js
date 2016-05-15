angular.module('app.controllers', [])

.controller('usersCtrl', function ($scope, socket, $state) {

	function refreshView() {
		$scope.localIdentifier = socket.getLocalIdentifier();
		socket.on('user list', function (userlist) {
			$scope.users = userlist
		});
		socket.emit('app - get users');
		console.log("list refreshed as user " + $scope.localIdentifier);
	}

	$scope.localIdentifier = socket.getLocalIdentifier();



	$scope.$on("$ionicView.enter", refreshView);

	$scope.editUser = function (key) {
		//if (key !== socket.getLocalIdentifier()) return;
		socket.setLocalIdentifier(key);
		$state.go("tabsController.userConfiguration");
	}

	$scope.newUser = function () {
		socket.newLocalIdentifier();
		$state.go("tabsController.userConfiguration");
	}

	$scope.deleteUser = function (id) {
		socket.emit('delete user', id);
		refreshView();
	}
})

.controller('myDayCtrl', function ($scope) {
	$scope.slideOptions = {
		direction: 'vertical'
	}
})

.controller('userConfigurationCtrl', function ($scope, socket, $state) {

	$scope.loggedOnUser = "[none]"

	// default transportation options
	$scope.primaryTransportation = "car";
	$scope.secondaryTransportation = "publictransport";

	socket.on('app - go to url', function (url) {
		window.open(url, '_blank', 'location=no');
	});

	socket.on('user authenticated', function (user) {
		$scope.loggedOnUser = user.name
	})

	socket.on('new user authenticated', function (user) {
		$scope.loggedOnUser = user.name
		$state.go("tabsController.users");
	})

	socket.on('user not authenticated', function (id) {
		console.log('user not authenticated');
	})

	$scope.$on("$ionicView.enter", function (event, data) {
		socket.emit('check login state');
	});

	$scope.connectToGoogle = function (primaryTransportation, secondaryTransportation) {
		socket.emit('app - create new user', [primaryTransportation, secondaryTransportation]);
	}
})

.controller('transitOptionsCtrl', function ($scope) {

})