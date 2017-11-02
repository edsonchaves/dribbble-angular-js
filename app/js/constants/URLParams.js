(function() {
    'use strict';

    angular
        .module( 'App' )
        .constant( 'URLParams', {
            page: 'page=',
            perPage: 'per_page=',
            accessToken: 'access_token='
        });
}());
