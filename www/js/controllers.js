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

})
   
.controller('transitOptionsCtrl', function($scope) {

})
 