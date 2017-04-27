'use strict';
MovieAppSPA.controller('indexController', ['$scope', '$location', function ($scope, $location) {
    $(window).resize(function () {
        _pageResize();
    });
 

    var _pageResize = function () {
        if ($(window).width() <= 975) {
            $("#wrapper, #page").width($(window).width());
        }
        else {
            $("#wrapper, #page").width($(window).width());
        }
        $("#wrapper, #page").height($(window).height() - 40);
    }
    _pageResize();
}]);