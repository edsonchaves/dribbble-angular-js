(function() {
    'use strict';

    angular
        .module( 'App' )
        .config([ '$routeProvider', function( $routeProvider ) {
            $routeProvider
                .when( '/', {
                    templateUrl: '/templates/views/shot-list.html',
                    controller: 'ShotListCtrl'
                })
                .when( '/shot/:id', {
                    templateUrl: '/templates/views/shot.html',
                    controller: 'ShotCtrl'
                })
                .when( '/404', {
                    templateUrl: '/templates/views/404.html'
                })
                .otherwise({
                    redirectTo: '/404'
                });
        }]);
}());
