var MovieAppSPA = angular.module("movieApp", ['ngRoute', 'ngMaterial', 'BladeJs', 'angular-loading-bar', 'kendo.directives', 'ngMessages']);

MovieAppSPA.config(['$routeProvider', '$locationProvider', '$httpProvider', 'cfpLoadingBarProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider, cfpLoadingBarProvider, $httpProvider) {
    RegisterRoutes($routeProvider, $locationProvider);

    $locationProvider.html5Mode(true).hashPrefix('#');

    cfpLoadingBarProvider.includeBar = true;

    delete $httpProvider.defaults.headers.common['X-Requested-With'];

}]);

MovieAppSPA.directive('customeinputnum', ["$compile", function ($compile) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            value: "="
        },
        link: function ($scope, elem, attrs) {
            var btnhtml = '<div class="custome-number-nav"><div class="custome-number-button custome-number-up" ng-click="btnUp()">+</div><div class="custome-number-button custome-number-down" ng-click="btnDown()">-</div></div>';
            var temp = $compile(btnhtml)($scope);
            elem.after(temp);

            $scope.btnUp = function () {
                var max = attrs.max;
                var oldValue = parseFloat(elem.val());
                if (oldValue >= max) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue + 1;
                }
                elem.val(newVal);
                elem.trigger("change");
            }
            $scope.btnDown = function () {
                var min = attrs.min;
                var oldValue = parseFloat(elem.val());
                if (oldValue <= min) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue - 1;
                }
                elem.val(newVal);
                elem.trigger("change");
            }
        }
    };
}]);

var RegisterRoutes = function ($routeProvider, $locationProvider) {
    $routeProvider.when("/movie", {
        controller: "movieListControler",
        templateUrl: "app/views/movieList.html",
    });   
    $routeProvider.otherwise({ redirectTo: "/movie" });
}

MovieAppSPA.constant('apiServiceBaseUri', 'http://localhost/MovieWebAppAPI/');

MovieAppSPA.run(['$rootScope', '$location', 'bladeService', function ($rootScope, $location, bladeService) {
    $rootScope.$on('$routeChangeStart', function (e, curr, prev) {
        if (curr != undefined && curr.$$route && curr.$$route.resolve) {
            // Show a loading message until promises are not resolved
        }
    });

    $rootScope.$on('$routeChangeSuccess', function (eventObj, curr, prev) {
        bladeService.Close();
    });
}]);