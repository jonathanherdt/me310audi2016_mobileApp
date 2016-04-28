angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.users', {
    url: '/users',
    views: {
      'tab1': {
        templateUrl: 'templates/users.html',
        controller: 'usersCtrl'
      }
    }
  })

  .state('tabsController.myDay', {
    url: '/myday',
    views: {
      'tab2': {
        templateUrl: 'templates/myDay.html',
        controller: 'myDayCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.userConfiguration', {
    url: '/userconfig',
    views: {
      'tab1': {
        templateUrl: 'templates/userConfiguration.html',
        controller: 'userConfigurationCtrl'
      }
    }
  })

  .state('tabsController.transitOptions', {
    url: '/transitoptions',
    views: {
      'tab4': {
        templateUrl: 'templates/transitOptions.html',
        controller: 'transitOptionsCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/tabs/users')

  

});