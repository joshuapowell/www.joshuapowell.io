(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name
     * @description
     * # authorizationInterceptor
     * Service in the ViableDataManagementSystem.
     */
    angular.module('ViableDataManagementSystem')
      .factory('AuthorizationInterceptor', function($log, $q) {

        return {
          request: function(config) {

            //
            // Configure our headers to contain the appropriate tags
            //
            config.headers = config.headers || {};

            config.headers['Cache-Control'] = 'no-cache, max-age=0, must-revalidate';

            //
            // Configure or override parameters where necessary
            //
            config.params = (config.params === undefined) ? {} : config.params;

            return config || $q.when(config);
          },
          response: function(response) {
            $log.info('AuthorizationInterceptor::Response', response || $q.when(response));
            return response || $q.when(response);
          },
          responseError: function (response) {
            $log.info('AuthorizationInterceptor::ResponseError', response || $q.when(response));
            return $q.reject(response);
          }
        };
      }).config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthorizationInterceptor');
      });

}());
