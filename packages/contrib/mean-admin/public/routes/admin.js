'use strict';
angular.module('mean.mean-admin').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('manage', {
                url: '/admin/manage',
                templateUrl: 'mean-admin/views/manage.html'
            });
    }
]).config(['ngClipProvider',
    function(ngClipProvider) {
        ngClipProvider.setPath('../mean-admin/assets/lib/zeroclipboard/ZeroClipboard.swf');
    }
]);