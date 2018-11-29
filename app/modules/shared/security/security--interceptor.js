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
      .factory('AuthorizationInterceptor', function($location, $q, ipCookie, $log) {

        return {
          request: function(config) {

            var sessionCookie = ipCookie('VIABLE_SESSION');

            //
            // Configure our headers to contain the appropriate tags
            //
            config.headers = config.headers || {};

            if (config.headers['Authorization-Bypass'] === true) {
              delete config.headers['Authorization-Bypass'];
              return config || $q.when(config);
            }

            if (sessionCookie) {
              config.headers.Authorization = 'Bearer ' + sessionCookie;
            } else if (!sessionCookie && $location.path() !== '/account/register' && $location.path() !== '/account/reset' && $location.path() !== '/' && $location.path() !== '/get-on-the-map'  && $location.path() !== '/self-assess') {
              /**
               * Remove all cookies present for authentication
               */
              ipCookie.remove('VIABLE_SESSION');
              ipCookie.remove('VIABLE_SESSION', { path: '/' });

              ipCookie.remove('VIABLE_CURRENTUSER');
              ipCookie.remove('VIABLE_CURRENTUSER', { path: '/' });

              $location.path('/account/login').search('');
            }

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

            if (response.config.url.indexOf('data/user') > -1 || response.status===403 || response.status===401) {
              $location.path('/user/logout');
            }

            return $q.reject(response);
          }
        };
      }).config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthorizationInterceptor');
      });

}());
