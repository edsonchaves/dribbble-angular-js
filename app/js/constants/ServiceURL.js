(function() {
    'use strict';

    angular
        .module( 'App' )
        .constant( 'ServiceURL', {
            getShotsURI: 'https://api.dribbble.com/v1/shots?{page}&{perPage}&{accessToken}',
            getCurrentShotURI: 'https://api.dribbble.com/v1/shots/{id}?{accessToken}',
            getLikeURI: 'https://api.dribbble.com/v1/shots/{id}/like?{accessToken}'
        });
}());
