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
                  resolve: {
                    current: function(Project) {
                      return Project.get({
                        id: "current"
                      });
                    },
                    dream: function(Project) {
                      return Project.get({
                        id: "dream"
                      });
                    },
                    projects: function(Project) {
                      return Project.get({
                        id: "all"
                      });
                    }
                  }
              });

        });

}());
