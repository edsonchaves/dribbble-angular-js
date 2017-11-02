(function() {
    'use strict';

    angular
        .module( 'App' )
        .controller( 'ShotCtrl', [ '$scope', 'ServiceURL', 'XHRFactory', '$routeParams', 'AlertMessages', 'URLParams', function( $scope, ServiceURL, XHRFactory, $routeParams, AlertMessages, URLParams ) {
            // variáveis expostas
            $scope.shotId = $routeParams.id;
            $scope.shot = [];
            $scope.serviceFail = "";
            $scope.messages = AlertMessages;

            // variáveis
            var getCurrentShotURL,
                shotLikeURL;
            
            // funções expostas
            $scope.shotLike = shotLike;

            function getCurrentShot() {
                getCurrentShotURL = ServiceURL.getCurrentShotURI
                .replace( '{id}', $scope.shotId )
                .replace( '{accessToken}', URLParams.accessToken + localStorage.clientAccessToken );

                XHRFactory
                .get( getCurrentShotURL )
                .then ( getCurrentShotDone, getCurrentShotFail );
            }

            function getCurrentShotDone( response ) {
                $scope.shot = response.data;
            }

            function getCurrentShotFail( response ) {
                $scope.serviceFail = $scope.messages.currentShotFail;
            }

            function shotLike() {
                shotLikeURL = ServiceURL.getLikeURI
                .replace( '{id}', $scope.shotId )
                .replace( '{accessToken}', URLParams.accessToken + localStorage.clientAccessToken );

                XHRFactory
                .post( shotLikeURL )
                .then ( shotLikeDone, shotLikeFail );
            }

            function shotLikeDone( response ) {
                console.log( response );
            }

            function shotLikeFail( response ) {
                $scope.serviceFail = $scope.messages.likeShotFail;
            }

            function init() {
                getCurrentShot();
            }

            init();
        }]);
}());
