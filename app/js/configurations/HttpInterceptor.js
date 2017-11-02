(function() {
    'use strict';

    angular
        .module( 'App' )
        .config([ '$httpProvider', function( $httpProvider ) {
            $httpProvider.interceptors.push( 'HttpInterceptor' );
            localStorage.clientAccessToken = "7eff3e90ccc2bc4eec73ef87c1f8bf67f2006241454aee6fe2ef0b743ed1ba55";
        }]);
}());
