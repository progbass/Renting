'use strict';

/**
 * @ngdoc function
 * @name desarrolloApp.directive:section
 * @description
 * # section
 * Directive of the desarrolloApp
 */
angular.module('app')
.directive('contact', function($window){
    return{
      require: '^viewport',
      scope: true,
      templateUrl: 'views/contact.html',
      link: function(scope, el, attrs) {
          scope.customScroll = $window.innerWidth + 1600;

          var rightbar2_init = parseInt($('#contact_clipRight_rect')[0].getAttribute('x'), 10);
          
          var draw = function(position){
            //console.log(position.amount+'    '+position.percentage)
            
            if(position.percentage <= 0){
              $('#contact .wrapper').toggleClass('fixed', false);

            } else {
              var y_pos = 0;
              var x_pos = 0;
              $('#contact .wrapper').toggleClass('fixed', true);
              
              if(position.percentage >= .04){
                angular.element(el).find('.contact_info').addClass('animate');
              } else {
                angular.element(el).find('.contact_info').removeClass('animate');
              }

              if(position.percentage >= .1){
                angular.element(el).find('.contact_form').addClass('animate');
              } else {
                angular.element(el).find('.contact_form').removeClass('animate');
              }


              if(position.percentage >= .18){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .18);
                var diff =  position.amount - checkpoint;
                var rightBar = angular.element('#contact_clipRight_rect');
                var rectPos = (rightbar2_init + diff);
                rectPos = rectPos > 1811 ? 1811 : rectPos
                rightBar[0].setAttribute('x',  rectPos);
              } else {
                var rightBar = angular.element('#contact_clipRight_rect');
                rightBar[0].setAttribute('x',  rightbar2_init);
              } 

              //console.log(position.amount+'   '+((angular.element(el).prop('offsetHeight') - $window.innerHeight) - 800))
              // if(position.amount > (angular.element(el).prop('offsetHeight') - $window.innerWidth)){
              //   var checkpoint = (angular.element(el).prop('offsetHeight') - $window.innerHeight);
              //   var diff = position.amount - checkpoint;
              //   x_pos = -(diff);
              //   setVendor($('#contact .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );

              // }
              if(position.amount > ((angular.element(el).prop('offsetHeight') - $window.innerHeight) - 800)){
                var checkpoint = ((angular.element(el).prop('offsetHeight') - $window.innerHeight) - 800);
                var diff = position.amount - checkpoint;
                var duration = 800;
                x_pos = -((diff / duration) * $window.innerWidth);
                x_pos = x_pos <= -$window.innerWidth ? -$window.innerWidth : x_pos;
                //setVendor($('#contact .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );
              }


              setVendor($('#contact .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );


            }

          }

          scope.$watch('scroll_position', function(newValue, oldValue) {
            draw(scope.getPosition());
          }, true);

          scope.resizeSection(el);
          scope.draw(scope.getPosition());
      }
    }
});







