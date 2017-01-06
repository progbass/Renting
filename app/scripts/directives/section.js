'use strict';

/**
 * @ngdoc function
 * @name desarrolloApp.directive:section
 * @description
 * # section
 * Directive of the desarrolloApp
 */
angular.module('app')
.directive('viewport', function($window){
    return{
      require: '^scroller',
      controller: ['$scope', '$element', function($s, $e){
      }],
      link: function(scope, el, attrs, controller) {

        // Controller Properties Definitions
        scope.customScroll = 0;
        scope.inView = false;
        scope.isMobile = true;



        // Watch if the current section is inView
        var scroll_watcher;
        scope.$watch(function() { return el.hasClass('inView'); }, function(newValue, oldValue) {
          console.log(newValue+'   '+oldValue)

          // If the section is inView...
          if(newValue){
            // We begin to watch for every change in the position of the scrollbar
            // relative of the current section 
            scroll_watcher = scope.$watch('scroll_position', function(newValue, oldValue) {

              // If we are running on 'desktop' we broadcast the 'draw' event
              if(!scope.isMobile)
                scope.$broadcast('draw');

            }, true);

          // If the section is out of the 'view field' we remove the scrollbar watcher
          // and the 'fixed' class
          } else {
            el.find('.wrapper').toggleClass('fixed', false);

            if(scroll_watcher)
              scroll_watcher();
          }
        });



        // Bind a resize listener to the window object
        angular.element($window).bind('resize', function(){
          // Call the resizeSection method to adjust layout and other settings
          scope.resizeSection();

          // Update changes
          scope.$digest();
        });



        // Empty 'draw' method. We will overwrite it on specific directives
        scope.draw = function(){}


        // Resize Section Method
        scope.resizeSection = function(){

          // If viewport width is greater than 'n'...
          if($window.innerWidth > 700){
            // Set Mobile Mode as False
            scope.isMobile = false;

            // Update section height
            var height = $window.innerHeight;
            if(scope.customScroll > $window.innerHeight)
              height = scope.customScroll;

            // set height
            el.height( $window.innerHeight + scope.customScroll );


          // If viewport width is less than 'n'...
          } else {
            // Set mobile mode as True
            scope.isMobile = true;
            
            // set height
            el.height( 'auto' );

          }
        }



        // Get Position Method. Gets the position of the scrollbar relative to the current section
        scope.getPosition = function(){
          // Initital values
          var windowOffset = $window.pageYOffset,
              windowHeight = $window.outerHeight;

          // Calculate section values and properties
          var sectionTop = angular.element(el).prop('offsetTop'),
              sectionHeight = angular.element(el).prop('offsetHeight'),
              sectionMidpoint = sectionTop + sectionHeight/2,
              sectionBottom = sectionTop + sectionHeight,
              windowMidpoint = windowOffset + windowHeight/2,
              windowBottom = windowOffset + windowHeight;

          var change = (windowOffset-sectionTop)/(sectionHeight);
          //console.log(windowOffset+'    '+sectionTop)


          // Return the current scrollbar position in different formats
          // percentage, total and amount
          return {percentage: change, total: windowOffset, amount: (windowOffset-sectionTop), el: el};
        }
      }
    }
});






