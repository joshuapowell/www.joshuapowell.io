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
              .when('/projects', {
                  templateUrl: '/modules/components/project/views/project--view.html',
                  controller: 'ProjectController',
                  controllerAs: 'page',
                  resolve: {}
              })
              .when('/projects/:id', {
                  templateUrl: '/modules/components/project/views/projectSingle--view.html',
                  controller: 'ProjectSingleController',
                  controllerAs: 'page',
                  resolve: {
                    project: function(Project, $route) {
                      return Project.get({
                        id: $route.current.params.id
                      });
                    }
                  }
              });

        });

}());
