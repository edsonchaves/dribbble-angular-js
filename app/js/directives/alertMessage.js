(function() {
    'use strict';

    angular
        .module( 'App' )
        .directive( 'alertMessage', [function() {
            return {
                restrict : "E",
                scope : {
                    message : "@"
                },
                replace : true,
                transclude: true,
                templateUrl : "/templates/directives/alert-message.html"   
            };
        }]);
}());
