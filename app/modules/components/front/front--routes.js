(function () {

    'use strict';

    /**
     * @ngdoc overview
     * @name ViableDataManagementSystem
     * @description
     */

    angular.module('ViableDataManagementSystem')
        .config(function ($routeProvider) {

          $routeProvider
              .when('/', {
                  templateUrl: '/modules/components/front/views/front--view.html',
                  controller: 'FrontController',
                  controllerAs: 'page',
                  resolve: {}
              });

        });

}());
