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
              .when('/:pageName', {
                  templateUrl: '/modules/components/pages/views/page--view.html',
                  controller: 'PageController',
                  controllerAs: 'page',
                  resolve: {
                    page_content: function(Page, $route) {
                      return Page.get({
                        id: $route.current.params.pageName
                      });
                    }
                  }
              })
              .when('/:sectionName/:pageName', {
                  templateUrl: '/modules/components/pages/views/page--view.html',
                  controller: 'PageController',
                  controllerAs: 'page',
                  resolve: {
                    page_content: function(Page, $route) {
                      return Page.withSection({
                        id: $route.current.params.pageName,
                        sectionName: $route.current.params.sectionName
                      });
                    }
                  }
              })


        });

}());
