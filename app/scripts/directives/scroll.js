'use strict';

/**
 * @ngdoc function
 * @name desarrolloApp.directive:aboutDirective
 * @description
 * # aboutDirective
 * Directive of the desarrolloApp
 */
angular.module('app')
.directive('scroller', function($window){
    return{
      controllerAs: 'ScrollCtrl',
      controller: ['$scope', '$location', '$window', function ($scope, $location, $window) {
        // Properties
        $scope.scenes = Array('home', 'about', 'offer', 'leasing', 'contact', 'faqs');
        $scope.color = Array(0, 1, 2, 0, 1);
        $scope.menu_color = Array(0, 1, 1, 0, 0, 0);
        $scope.slide = 0;
        $scope.change = 0;
        $scope.scroll_position = $window.pageYOffset;
        
        // Watchers...
        $scope.$watch("slide", function(newValue, oldValue) {

          if(!$scope.isMobile){
            if (newValue !== 0 && newValue !== "" && newValue !== $scope.scenes.length) {
                // Update Browser URL
                $location.path($scope.scenes[newValue]);

                // Logo Color
                angular.element('#main_container .logo').removeClass('color0 color1 color2');
                angular.element('#main_container .logo').addClass('color'+newValue);

                // Menu Icon Color
                angular.element('#main_container a.menu_icon').removeClass('color0 color1');
                angular.element('#main_container a.menu_icon').addClass('color'+$scope.menu_color[newValue]);

            } else {
                // Update Browser URL
                $location.path('/');

                // Logo Color
                angular.element('#main_container .logo').removeClass('color0');
                angular.element('#main_container .logo').removeClass('color1');
                angular.element('#main_container .logo').removeClass('color2');
                angular.element('#main_container .logo').addClass('color0');

                // Menu Icon Color
                angular.element('#main_container a.menu_icon').removeClass('color0 color1');
            };
          }

        });
      }],
      
      link: function(scope, el, attrs, controllers) {
          var sections = el.find('section');

          angular.element($window).bind("scroll", function () {
              var offset = $window.pageYOffset,
                  windowTop = $window.pageYOffset,
                  windowHeight = $window.outerHeight;

              scope.scroll_position = offset;

              for (var i = 0, sectionsLength = sections.length; i < sectionsLength; i++) {
                 var 
                    section = angular.element(sections[i]),
                    sectionTop = angular.element(sections[i]).prop('offsetTop'),
                    sectionHeight = angular.element(sections[i]).prop('offsetHeight'),
                    sectionMidpoint = sectionTop + sectionHeight/2,
                    sectionBottom = sectionTop + sectionHeight,
                    windowMidpoint = windowTop + windowHeight/2,
                    windowBottom = windowTop + windowHeight;

                 if (windowTop >= sectionTop && windowTop < sectionBottom) {
                      var index = i,
                          change = (windowTop - sectionTop)/(sectionHeight);

                          scope.slide = i;
                          scope.change = change;
                          //
                          angular.element(sections[i]).addClass('inView')

                  } else {
                          angular.element(sections[i]).removeClass('inView')

                  };
              };
               
              scope.$apply();
          });
      }
    }
});
