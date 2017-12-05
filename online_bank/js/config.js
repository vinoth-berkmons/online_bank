
function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index/bank");


    $stateProvider
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/bank/common/content.html"
        })

        .state('bankindex', {
            abstract: true,
            url: "/bankindex",
            templateUrl: "views/bank/common/content.html"
        })

}
angular
    .module('myApp')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
