! function (e, t, n) {
    "use strict";
    ! function () {
        t.module("BladeJs", ["material.components.BladeComponent"])
    }(),
    //material.core
   (function () {
       "use strict";
       /**
        * @ngdoc module
        * @name material.components.Blade
        */
       angular
        .module('material.components.BladeComponent', [
         'material.core',
         'material.components.backdrop'
        ])
        .provider('$Blade', BladeProvider);

       function BladeProvider($$interimElementProvider) {

           BladeDefaultOptions.$inject = ["$Blade", "$mdAria", "$mdUtil", "$mdConstant", "$animate", "$document", "$window", "$rootElement", "$controller"];
           return $$interimElementProvider('$Blade')
            .setDefaults({
                methods: ['title', 'width', 'templates', 'arraylength', 'actionText', 'currentvalue', 'currentTemplate', 'close', 'data', 'excludedFooterElements', 'instanceId'],
                options: BladeDefaultOptions
            });



           /* @ngInject */
           function BladeDefaultOptions($Blade, $mdAria, $mdUtil, $mdConstant, $animate, $document, $window, $rootElement) {
               return {
                   onShow: onShow,
                   onRemove: onRemove,
                   clickOutsideToClose: true,
                   controllerAs: 'BladeController',
                   bindToController: true,
                   transformTemplate: function (template) {
                       return "<div class='subpage' style='width:{{BladeController.width}}px'><div class='blade'><div class='blade-content'><header><div class='container-fluid'><h1>{{BladeController.title}}<md-tooltip>{{BladeController.title}}</md-tooltip></h1><a class='close-btn pull-right' ng-click='BladeController.close();'>x</a></div></header><div data-ng-include src='BladeController.currentTemplate' ng-class='{noFooter: !BladeController.canShow(&apos;footer&apos;)}'></div><footer ng-if='BladeController.canShow(&apos;footer&apos;)'><div class='container-fluid'><span ng-if='BladeController.canShow(&apos;cancel&apos;)'><md-button ng-click='BladeController.close();' class='md-raised md-button'>Cancel</md-button></span><div class='pull-right'><span ng-if='BladeController.arraylength>1&&BladeController.currentValue>0&&BladeController.canShow(&apos;previous&apos;)'><md-button ng-click='BladeController.onPrevious()' ng-show='BladeController.currentValue&&BladeController.arraylength!=1' class='md-raised md-secondary ng-hide'>Previous</md-button></span><span ng-if='BladeController.arraylength>1&&BladeController.currentValue!=BladeController.arraylength-1&&BladeController.canShow(&apos;next&apos;)'> &nbsp;<md-button ng-click='BladeController.onNext();' ng-disabled='!nextEnable' ng-show='BladeController.currentValue!=BladeController.arraylength-1&&BladeController.arraylength>1' class='md-raised md-secondary ng-hide'>Next</md-button></span> &nbsp;<md-button type='button' ng-disabled='!enable' aria-label='BladeOperation' ng-click='BladeOperation();' ng-show='BladeController.actionText&&BladeController.canShow(BladeController.actionText)' class='md-raised md-primary pull-right ng-hide' > {{BladeController.actionText}}</md-button></div></div></footer></div></div></div>";
                   }

               };

               /**
                * Show method for Blade
                */
               function onShow(scope, element, options, controller) {

                   initializeExtraMethods(scope.BladeController)
                   return BladePopIn(element, options, scope);
                   /**
                    *  Blade open and Slide-in animation
                    */
                   function BladePopIn(container, options) {
                       options.parent = $("#wrapper");
                       // Add Container to the DOM
                       options.parent.append(container);
                       options.parent.animate({ scrollLeft: scope.BladeController.width + 10 }, 700);
                       return;
                   }
               }

               function onRemove(scope, element, options) {
                   if (scope.BladeController.controller == 'notificationController') {
                       scope.Notifications.UnreadCount = 0;
                   }
                   delete scope['BladeController'];
                   return detachAndClean();
                   function detachAndClean() {
                       options.parent = $("#wrapper");
                       options.parent.animate(
           {
               scrollLeft: 0
           }, 700, function () {
               element.remove();
           });
                   }
               }

               function initializeExtraMethods(bladeController) {
                   bladeController["canShow"] = function (Obj) {
                       return bladeController.excludedFooterElements[bladeController.currentValue].Element.indexOf(Obj) >= 0 ? false : true;
                   }
                   bladeController["onNext"] = function () {
                       if (bladeController.currentValue != bladeController.templates.length - 1) {
                           bladeController.currentTemplate = bladeController.templates[++bladeController.currentValue];
                       }
                       else {
                           bladeController.currentValue = 0;
                           bladeController.currentTemplate = bladeController.templates[bladeController.currentValue];
                       }
                   }
                   bladeController["onPrevious"] = function () {
                       if (bladeController.currentValue != 0) {
                           bladeController.currentTemplate = bladeController.templates[--bladeController.currentValue];
                       }
                       else {
                           bladeController.currentValue = bladeController.templates.length - 1;
                           bladeController.currentTemplate = bladeController.templates[bladeController.currentValue];
                       }
                   }
               }
           }
       }
       BladeProvider.$inject = ["$$interimElementProvider"];

   })()
}(window, window.angular);
