(function() {
    'use strict';

    angular
        .module( 'App' )
        .factory( 'XHRFactory', [ '$http', function( $http ) {
            return {
                get: function( serviceURL ) {
                    return $http.get( serviceURL );
                },
                post: function( serviceURL, data ) {
                    return $http.post( serviceURL, data );
                },
                update: function( serviceURL, data ) {
                    return $http.put( serviceURL, data );
                },
                delete: function( serviceURL ) {
                    return $http.delete( serviceURL );
                }
            };
        }]);
}());
