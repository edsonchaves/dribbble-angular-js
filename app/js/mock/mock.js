(function() {
    'use strict';

    angular
        .module( 'App' )
        .run( function( $httpBackend ) {

            $httpBackend
                .whenGET( '/url-do-servico' )
                .respond( 200, {});

            $httpBackend
                .whenPOST( '/url-do-servico' )
                .respond( 200, {});

            $httpBackend
                .whenPUT( '/url-do-servico' )
                .respond( 200, {});

            $httpBackend
                .whenDELETE( '/url-do-servico' )
                .respond( 200, {});


            $httpBackend.whenGET( /.*/ ).passThrough();
        });
}());
