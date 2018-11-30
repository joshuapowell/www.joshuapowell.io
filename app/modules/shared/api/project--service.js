(function() {

  'use strict';

  /**
   * @ngdoc service
   * @name
   * @description
   */
  angular.module('ViableDataManagementSystem')
    .service('Project', function (environment, $resource) {
      return $resource(environment.siteUrl.concat('/data/project/:id.json'), {
        id: '@id'
      }, {
        query: {
          isArray: false
        }
      });
    });

}());
