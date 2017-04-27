'use strict';
MovieAppSPA.factory('bladeService', ['$rootScope', '$q', '$Blade', function ($rootScope, $q, $Blade) {
    var bladeServiceFactory = {};
    var callback = "";
    var _showBlade = function (bladeModel) {
        if ($rootScope.liveBladeInstanceId != bladeModel.InstanceId) {
            $rootScope.liveBladeInstanceId = bladeModel.InstanceId;
            $Blade.show({
                instanceId: bladeModel.InstanceId,
                controller: bladeModel.Controller,
                title: bladeModel.Title,
                templates: bladeModel.Templates,
                arraylength: bladeModel.Templates.length,
                width: bladeModel.Width,
                actionText: bladeModel.ActionText,
                currentValue: 0,
                currentTemplate: bladeModel.Templates[0],
                close: _close,
                excludedFooterElements: bladeModel.ExcludedFooterElements,
                data: bladeModel.Data,
            });
            callback = bladeModel.Callback;
        }
    };

    var _close = function () {
        $rootScope.liveBladeInstanceId = null;
        $Blade.hide();
        $('#wrapper .k-grid-content').each(function () {
            $($(this).children("table")[0].rows).each(function () {
                if ($(this).hasClass("k-state-selected"))
                    $(this).removeClass("k-state-selected");
            });
        });
    };
    var _callBack = function (parameter) {
        if (callback && typeof callback === "function")
            callback(parameter);
    }

    var _nextPage = function ($scope) {
        $scope.BladeController.onNext();
    }

    var _previousPage = function ($scope) {
        $scope.BladeController.onPrevious();
    }

    bladeServiceFactory.showBlade = _showBlade;
    bladeServiceFactory.Close = _close;
    bladeServiceFactory.NextPage = _nextPage;
    bladeServiceFactory.PreviousPage = _previousPage;
    bladeServiceFactory.CallBack = _callBack;

    return bladeServiceFactory;
}]);