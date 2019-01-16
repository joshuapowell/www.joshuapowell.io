(function() {

  'use strict';

  /**
   * @ngdoc service
   * @name
   * @description
   */
  angular.module('ViableDataManagementSystem')
    .service('Page', function (environment, $resource) {
      return $resource(environment.siteUrl.concat('/data/page/:id.json'), {
        id: '@id',
        sectionName: '@sectionName'
      }, {
        query: {
          isArray: false
        },
        withSection: {
          url: environment.siteUrl.concat('/data/page/:sectionName/:id.json')
        }
      });
    });

}());
