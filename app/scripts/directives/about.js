'use strict';

/**
 * @ngdoc function
 * @name desarrolloApp.directive:section
 * @description
 * # section
 * Directive of the desarrolloApp
 */
angular.module('app')
.directive('about', function($window){
    return{
      require: '^viewport',
      templateUrl: 'views/about.html',
      scope: true,
      link: function(scope, el, attrs) {
          scope.customScroll = 5000;


          var topbar_init = parseInt($('#aboutClipRectTop')[0].getAttribute('y'), 10);
          var rightbar_init = parseInt($('#aboutClipRectRight')[0].getAttribute('x'), 10);
          var topbar2_init = parseInt($('#about2ClipRectTop')[0].getAttribute('y'), 10);
          var rightbar2_init = parseInt($('#about2ClipRectRight')[0].getAttribute('x'), 10);
          var draw = function(position){
            //console.log(position.amount+'    '+position.percentage)
            
            if(position.percentage <= 0){
              $('#about .wrapper').toggleClass('fixed', false);

            } else {
              var y_pos = 0;
              var x_pos = 0;
              $('#about .wrapper').toggleClass('fixed', true);
              setVendor($('#about .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );


              if(position.percentage >= .02){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .02);
                var diff =  position.amount - checkpoint;
                var topBar = angular.element('#aboutClipRectTop');
                var rectPos = (topbar_init + diff) * 1.1;
                rectPos = rectPos > 0 ? 0 : rectPos
                topBar[0].setAttribute('y',  rectPos);
              } else {
                var topBar = angular.element('#aboutClipRectTop');
                topBar[0].setAttribute('y',  topbar_init);
              } 


              if(position.percentage >= .05){
                angular.element(el).find('.title').addClass('animate');
              } else {
                angular.element(el).find('.title').removeClass('animate');
              }



              if(position.percentage >= .12){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .12);
                var diff =  position.amount - checkpoint;
                var rightBar = angular.element('#aboutClipRectRight');
                var rectPos = (rightbar_init + diff) * 1.6;
                rectPos = rectPos > 280 ? 280 : rectPos
                rightBar[0].setAttribute('x',  rectPos);
              } else {
                var rightBar = angular.element('#aboutClipRectRight');
                rightBar[0].setAttribute('x',  rightbar_init);
              } 


              if(position.percentage >= .246){
                angular.element(el).find('.icon.beneficios').addClass('animate');
              } else {
                angular.element(el).find('.icon.beneficios').removeClass('animate');
              }

              if(position.percentage >= .32){
                angular.element(el).find('.icon.mercado').addClass('animate');
              } else {
                angular.element(el).find('.icon.mercado').removeClass('animate');
              }



              if(position.percentage > .48){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .48);
                var diff = position.amount - checkpoint;
                var duration = 800;
                x_pos = -((diff / duration) * $window.innerWidth);
                x_pos = x_pos <= -$window.innerWidth ? -$window.innerWidth : x_pos;
                setVendor($('#about .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );

              }



              if(position.percentage >= .58){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .58);
                var diff =  position.amount - checkpoint;
                var rightBar = angular.element('#about2ClipRectRight');
                var rectPos = (rightbar2_init + diff) * 1.6;
                rectPos = rectPos > 0 ? 0 : rectPos
                rightBar[0].setAttribute('x',  rectPos);
              } else {
                var rightBar = angular.element('#about2ClipRectRight');
                rightBar[0].setAttribute('x',  rightbar2_init);
              } 




              if(position.percentage >= .74){
                angular.element(el).find('.icon.mexico').addClass('animate');
              } else {
                angular.element(el).find('.icon.mexico').removeClass('animate');
              }

              if(position.percentage >= .81){
                angular.element(el).find('.icon.nacional').addClass('animate');
              } else {
                angular.element(el).find('.icon.nacional').removeClass('animate');
              }




              if(position.percentage >= .85){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .85);
                var diff =  position.amount - checkpoint;
                var topBar = angular.element('#about2ClipRectTop');
                var rectPos = (topbar2_init + diff) * 1.1;
                rectPos = rectPos > 935 ? 935 : rectPos
                topBar[0].setAttribute('y',  rectPos);
              } else {
                var topBar = angular.element('#about2ClipRectTop');
                topBar[0].setAttribute('y',  topbar2_init);
              } 





              if(position.amount > (angular.element(el).prop('offsetHeight') - $window.innerHeight)){
                var checkpoint = (angular.element(el).prop('offsetHeight') - $window.innerHeight);
                var diff = position.amount - checkpoint;
                var offset = position.amount - checkpoint;
                y_pos = -(offset);
                setVendor($('#about .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );

              }

            }


/*
            var y_pos = $window.innerHeight - position.total;
            y_pos = (y_pos < 0) ? 0 : y_pos;
            //console.log(y_pos)
            setVendor($('#about .wrapper')[0], 'transform', 'translate3d(0px, '+(y_pos)+'px, 0px)' );
          

            // Horizontal Movement
            var checkpoint = $window.innerWidth;
            var distance = 800;
            if(position.amount > checkpoint){
              var offset = position.amount - checkpoint;
              var pos_x = -($window.innerWidth * (offset/distance));
              //console.log(position.amount+'  '+checkpoint)
              pos_x = pos_x < -$window.innerWidth ? -$window.innerWidth : pos_x;




              var checkpoint2 = checkpoint + distance + 800
              var distance = 800;
              if(position.amount > checkpoint2){
                offset = position.amount - checkpoint2;
                pos_x = -$window.innerWidth;
                y_pos = -($window.innerHeight * (offset/distance));//checkpoint2 - position.amount
              }


              setVendor($('#about .wrapper')[0], 'transform', 'translate3d('+pos_x+'px, '+y_pos+'px, 0px)' );
            }
*/

          }

          scope.$watch('scroll_position', function(newValue, oldValue) {
            draw(scope.getPosition());
          }, true);

          scope.resizeSection(el);
          scope.draw(scope.getPosition());
      }
    }
});







