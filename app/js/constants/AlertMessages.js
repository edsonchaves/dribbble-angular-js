(function() {
    'use strict';

    angular
        .module( 'App' )
        .constant( 'AlertMessages', {
            shotsListFail: 'Ocorreu um erro ao carregar a lista de shots. Tente novamente mais tarde.',
            currentShotFail: 'Ocorreu um erro ao carregar o shot. Tente novamente mais tarde.',
            likeShotFail: 'Ocorreu um erro ao curtir o shot. Tente novamente mais tarde.'
        });
}());
