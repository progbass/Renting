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
      controller: 'ScrollCtrl',
      
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
