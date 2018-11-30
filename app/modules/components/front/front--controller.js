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
        .controller('FrontController', function (projects, $location, $log, $scope, $window) {

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

            self.projects = projects;

            $window.scrollTo(0, 0);

            $scope.$on('$viewContentLoaded', function(event) {
              $window.gtag('config', '', {
                    'page_title': 'Joshua Powell Front Page',
                    'page_location': $location.url(),
                    'page': $location.url()
                  });
            });

        });

}());
