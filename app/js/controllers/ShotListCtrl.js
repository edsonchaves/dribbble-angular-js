(function() {
    'use strict';

    angular
        .module( 'App' )
        .controller( 'ShotListCtrl', [ '$scope', 'ServiceURL', 'XHRFactory', 'AlertMessages', 'URLParams', function( $scope, ServiceURL, XHRFactory, AlertMessages, URLParams ) {
            // variáveis expostas
            $scope.shots = [];
            $scope.shotSize = "";
            $scope.serviceFail = "";
            $scope.messages = AlertMessages;
            $scope.URLParams = URLParams;
            $scope.shotsPage = 1;
            
            // funções expostas
            $scope.getShots = getShots;
            $scope.resizeShots = resizeShots;
            $scope.getMoreShots = getMoreShots;

            function init() {
                getShots();
            }

            function getShots() {
                var getShotsURL = ServiceURL.getShotsURI
                .replace( '{page}', URLParams.page + $scope.shotsPage )
                .replace( '{perPage}', URLParams.perPage + '12' )
                .replace( '{accessToken}',  URLParams.accessToken + localStorage.clientAccessToken );

                XHRFactory
                .get( getShotsURL )
                .then ( getShotsDone, getShotsFail );
            }

            function getShotsDone( response ) {
                var data = response.data;
                $scope.shots = $scope.shots.concat(data);
            }

            function getShotsFail( response ) {
                $scope.serviceFail = $scope.messages.shotsListFail;
            }

            function getMoreShots() {
                $scope.shotsPage = $scope.shotsPage + 1;
                getShots();
            }

            function resizeShots( size ) {
                $scope.shotSize = size;
            }

            init();
        }]);
}());
