(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name
     * @description
     */
     angular.module('ViableDataManagementSystem')
       .service('Preprocessors', function ($resource) {

         return {
           geojson: function(raw, excludeGeometry) {

             var self = this;

             if (raw && raw.id && !raw.properties) {
               return {
                 id: parseInt(raw.id)
               };
             }
             else if (raw && !raw.id && !raw.properties) {
               return;
             }

             var feature = {};

             //
             // Process all of the object, array, string, numeric, and boolean
             // fields; Adding them to the main feature object;
             //
             angular.forEach(raw.properties, function(attribute, index) {

               var value = null;

               if (angular.isArray(attribute)) {
                 var newArray = [];

                 angular.forEach(attribute, function (childObject) {
                   if (index === 'addresses') {
                    newArray.push(self.geojson(childObject, false));
                   }
                   else {
                    newArray.push(self.geojson(childObject, true));
                   }
                 });

                 value = newArray;
               }
               else if (angular.isObject(attribute)) {
                 value = self.geojson(attribute, true);
               }
               else {
                 value = attribute;
               }
               feature[index] = value;
             });

             //
             // If a `geometry` attribute is present add it to the main feature
             // object;
             //
             if (excludeGeometry !== true) {
               feature.geometry = raw.geometry;
             }

             return feature;
           }
         };

       });

}());
