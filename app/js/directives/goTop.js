(function() {
    'use strict';

    angular
        .module( 'App' )
        .directive( 'goTop', [function() {
            return {
				restrict: 'E',
				replace: true,
				template: '<div class="go-top"><span class="glyphicon glyphicon-chevron-up"></span></div>',
				link: function($scope, element, attrs) {
					element.bind('click', function() {
						scrollTo(document.body, 0, 100);
					});
				}
			};
        }]);
}());
