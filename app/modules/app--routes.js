(function() {

  'use strict';

  /**
   * @ngdoc overview
   * @name ViableDataManagementSystem
   * @description

   */
  angular.module('ViableDataManagementSystem')
    .config(function ($locationProvider, $routeProvider) {

      //
      // For any unmatched url, redirect to home
      //
      $routeProvider
        .when('/404.html', {
          redirectTo: '/404'
        })
        .when('/404', {
          templateUrl: '/404.html'
        })
        .otherwise({
          redirectTo: '/404.html'
        });

      //
      // Make sure that HTML mode is enabled
      //
      // @see https://docs.angularjs.org/api/ng/provider/$locationProvider#html5Mode
      //
      // Requires:
      //
      //    `<base href="/" />`
      //
      $locationProvider.html5Mode(true).hashPrefix('!');
    }).
    run(function($rootScope, $location, $anchorScroll) {
      $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        if($location.hash()) $anchorScroll();
      });
    });

}());
