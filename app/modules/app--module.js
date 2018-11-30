(function() {

  'use strict';

  /**
   * @ngdoc overview
   * @name ViableDataManagementSystem
   * @description
   */
  angular
    .module('ViableDataManagementSystem', [
      'ngResource',
      'ngRoute',
      'ngTouch',
      'ngSanitize',
      'ipCookie',
      'config',
      'ngMessages'
    ]).config(function($compileProvider){
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
    });

}());
