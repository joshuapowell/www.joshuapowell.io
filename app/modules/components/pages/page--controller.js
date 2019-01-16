(function () {

    "use strict";

    /**
     * @ngdoc controller
     * @name
     *   ReportListController
     * @description
     *   An example controller to show how to use self and variables
     *   from the route properly
     */
    angular.module('ViableDataManagementSystem')
        .controller('PageController', function ($location, $log, page_content, $rootScope, $route, $sce, $scope, $window) {

            /**
             * Defining the `this` variable at the Controller level will
             * enable us to use `self` any where throughout this Controller
             * so that we can use our top level Controller `this.` variables
             * within closures without any issues.
             *
             * @see For a better understanding of how we use the `this`
             *      variable see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
             *
             * @see For a better understanding of closures see
             *      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
             */
            var self = this;

            page_content.$promise.then(function(successResponse) {
              self.content = successResponse;

              $log.log('self.content', self.content);

              $rootScope.meta = {
                "title": self.content.properties.meta.title,
                "description": self.content.properties.meta.description,
                "og": {
                  "title": self.content.properties.meta.title,
                  "description": self.content.properties.meta.description,
                  "image": self.content.properties.meta.image,
                  "permalink": self.content.properties.meta.permalink
                }
              }

            })

            $window.scrollTo(0, 0);

            self.trustLink = function(src) {
                return $sce.trustAsResourceUrl(src);
            }

            $scope.$on('$viewContentLoaded', function(event) {
              $window.gtag('config', 'UA-108815253-1', {
                    'page_title': 'Project Page: ' + $route.current.params.id,
                    'page_location': $location.url(),
                    'page': $location.url()
                  });
            });

        });

}());
