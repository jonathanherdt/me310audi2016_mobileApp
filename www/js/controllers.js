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




.controller('myDayCtrl', function ($scope, socket) {
	$scope.slideOptions = {
		direction: 'vertical'
	}

	$scope.$on("$ionicView.enter", function (event, data) {
		socket.on('app - calendar', receivedCalendarFunction);
		socket.on('user authenticated', receivedUserName);
		var yesterday = new Date().setDate(new Date().getDate() - 1);
		console.log(yesterday);
		socket.emit('app - get calendar', {day: yesterday});
		socket.emit('check login state');
	});
	
	$scope.adjustTransportationMethod = function (method, name, event) {

		event.userSelectedTransitOption = method;

		var data = {
			name: name,
			event: event
		};

		socket.emit('clock - event updated', data);

		var yesterday = new Date().setDate(new Date().getDate() - 1);
		console.log(yesterday);
		socket.emit('app - get calendar', {day: yesterday});
		socket.emit('app - get calendar', Date.now());
	}

	var receivedUserName = function (user) {
		$scope.loggedOnUser = user.name
	}

	var receivedCalendarFunction = function (calendar) {
		console.log(calendar);
        // set the user data
        var userData = {
            picture: calendar.picture,
            title: "",
            transit: []
        };

        // find the next event for the user
        var nextEvent = {
            msecsUntilStart: -1,
            event: null
        };

        calendar.events.forEach(function (event) {
			event.start = new Date(event.start);
			event.end = new Date(event.end);
		});

        $scope.transitTranslations = {
			car: 'car', 
			walking: 'walk', 
			subway: 'bus', 
			bicycle:'bicycle'
		}

        var now = new Date();
        calendar.events.forEach(function (event) {
            var msecsUntilEvent = (event.start - now);
            // we dont want events that are already over or ones that the user is
            // too late for anyway (we take 2 minutes after having left for the next
            // event as being too late)
            if (msecsUntilEvent < 0 ||
                (event.optimized_transit && event.start.getTime() -
                 event.optimized_transit.best.duration * 60000 - now.getTime() < -1000 * 60 * 2 &&
                 event.start.getTime() - event.optimized_transit.alternative.duration * 60000 - now.getTime() < -1000 * 60 * 2)){
                return;
            }
            if (nextEvent.msecsUntilStart === -1 || nextEvent.msecsUntilStart > msecsUntilEvent) {
                nextEvent.msecsUntilStart = msecsUntilEvent;
                nextEvent.event = event;
            }
        });

        // retrieve transit information for the next event
        if (nextEvent.event != null) {
            userData.title = nextEvent.event.title;
            if (nextEvent.event.optimized_transit != undefined) {
                var timeToLeaveBest = new Date(nextEvent.event.start.getTime() - nextEvent.event.optimized_transit.best.duration * 60000);

                var timeToLeaveSecondBest = new Date(nextEvent.event.start.getTime() - nextEvent.event.optimized_transit.alternative.duration * 60000);
                userData.transit = [
                    {
                        type: nextEvent.event.optimized_transit.best.name,
                        hoursLeft: Math.floor(Math.round((timeToLeaveBest - now) / 1000 / 60 / 60)),
                        minutesLeft: Math.round((timeToLeaveBest - now) / 1000 / 60) % 60
                  },
                    {
                        type: nextEvent.event.optimized_transit.alternative.name,
                        hoursLeft: Math.floor(Math.round((timeToLeaveBest - now) / 1000 / 60 / 60)),
                        minutesLeft: Math.round((timeToLeaveSecondBest - now) / 1000 / 60) % 60
                  }

                ];
            }
            userData.startTime = {
            	minutesLeft: nextEvent.event.start.getMinutes() % 60,
            	hoursLeft: nextEvent.event.start.getHours()
            };
            
            userData.durationBy = {
	            car: Math.round(nextEvent.event.transit_options['car'].duration),
	            subway: Math.round(nextEvent.event.transit_options['subway'].duration),
	            walking: Math.round(nextEvent.event.transit_options['walking'].duration),
	            bicycle: Math.round(nextEvent.event.transit_options['bicycle'].duration)
			};

			userData.event = nextEvent.event;

        } else {
            userData.title = '- No more events today -';
        }
        
        $scope.userData = userData;

    };


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