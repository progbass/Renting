'use strict';

/**
 * @ngdoc function
 * @name desarrolloApp.directive:section
 * @description
 * # section
 * Directive of the desarrolloApp
 */
angular.module('app')
.directive('offer', function($window){return{
      require: '^viewport',
      scope: true,
      templateNamespace: 'svg',
      templateUrl: 'views/offer.html',
      controller: ['$scope', 'appServices', function($scope, appServices){
        var controller = this;

        controller.changeProduct = function(_target){
          appServices.changeProduct(_target);
        }
      }],
      controllerAs: 'offerCtrl',
      link: function(scope, el, attrs) {
          scope.customScroll = 9900;



          var topbar_init = parseInt($('#offerClipRectTop')[0].getAttribute('y'), 10);
          var rightbar_init = parseInt($('#offerClipRectRight')[0].getAttribute('x'), 10);
          var rightbar2_init = parseInt($('#offer2ClipRectRight')[0].getAttribute('x'), 10);
          
          var heightbar_top1_init = parseInt($('#offer_2clipTop1_rect')[0].getAttribute('y'), 10);
          var heightbar_bottom1_init = parseInt($('#offer_2clipBottom1_rect')[0].getAttribute('y'), 10);
          var heightbar_top2_init = parseInt($('#offer_2clipTop2_rect')[0].getAttribute('y'), 10); 
          var heightbar_bottom2_init = parseInt($('#offer_2clipBottom2_rect')[0].getAttribute('y'), 10);
          var rightbar3_init = parseInt($('#offer_2clipRight_rect')[0].getAttribute('x'), 10);

          var heightbar_top3_init = parseInt($('#offer_3clipTop_rect')[0].getAttribute('y'), 10);
          var rightbar4_init = parseInt($('#offer_3clipRight_rect')[0].getAttribute('x'), 10);



          var draw = function(position){
            //console.log(position.amount+'    '+position.percentage)

            //position.amount = $window.pageYOffset - angular.element('#offer').prop('offsetTop')

            if(position.percentage < 0){
              $('#offer .wrapper').toggleClass('fixed', false);
              //var y_pos = angular.element(el).prop('offsetTop') - position.total;
              //y_pos = (y_pos < 0) ? 0 : y_pos;
              //var x_pos = 0;
              //setVendor($('#offer .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );
            

            } else {

              var y_pos = 0;
              var x_pos = 0;
              $('#offer .wrapper').toggleClass('fixed', true);
              //setVendor($('#offer .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );



              if(position.percentage >= .008){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .008);
                var diff =  position.amount - checkpoint;
                var topBar = angular.element('#offerClipRectTop');
                var rectPos = (topbar_init + diff) * 1.1;
                rectPos = rectPos > 0 ? 0 : rectPos
                topBar[0].setAttribute('y',  rectPos);
              } else {
                var topBar = angular.element('#offerClipRectTop');
                topBar[0].setAttribute('y',  topbar_init);
              } 




              if(position.percentage >= .04){
                angular.element(el).find('.title').addClass('animate');
              } else {
                angular.element(el).find('.title').removeClass('animate');
              }




              if(position.percentage >= .05){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .05);
                var diff =  position.amount - checkpoint;
                var rightBar = angular.element('#offerClipRectRight');
                var rectPos = (rightbar_init + diff) * 1.6;
                rectPos = rectPos > 353 ? 353 : rectPos
                rightBar[0].setAttribute('x',  rectPos);
              } else {
                var rightBar = angular.element('#offerClipRectRight');
                rightBar[0].setAttribute('x',  rightbar_init);
              } 



              if(position.percentage >= .10){
                angular.element(el).find('.icon.personalizados').addClass('animate');
              } else {
                angular.element(el).find('.icon.personalizados').removeClass('animate');
              }

              if(position.percentage >= .15){
                angular.element(el).find('.icon.unidades').addClass('animate');
              } else {
                angular.element(el).find('.icon.unidades').removeClass('animate');
              }



              if(position.percentage >= .17){
                angular.element(el).find('.icon.subtitle').addClass('animate');
              } else {
                angular.element(el).find('.icon.subtitle').removeClass('animate');
              }



              if(position.percentage >= .18){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .18);
                var diff =  position.amount - checkpoint;
                var rightBar = angular.element('#offer2ClipRectRight');
                var rectPos = (rightbar2_init + diff);
                rectPos = rectPos > 1811 ? 1811 : rectPos
                rightBar[0].setAttribute('x',  rectPos);
              } else {
                var rightBar = angular.element('#offer2ClipRectRight');
                rightBar[0].setAttribute('x',  rightbar2_init);
              } 




              if(position.percentage > .21){
                var checkpoint = (angular.element(el).prop('offsetHeight')  * .21);
                var diff = position.amount - checkpoint;
                var duration = 800;
                x_pos = -((diff / duration) * $window.innerWidth);
                x_pos = x_pos <= -$window.innerWidth ? -$window.innerWidth : x_pos;
                setVendor($('#offer .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );

              }






              

              if(position.percentage >= .32){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .32);
                var diff =  position.amount - checkpoint;
                var heightBar = angular.element('#offer_2clipTop1_rect');
                var rectPos = (heightbar_top1_init - diff);
                rectPos = rectPos < 351 ? 351 : rectPos
                heightBar[0].setAttribute('y',  rectPos);
              } else {
                var heightBar = angular.element('#offer_2clipTop1_rect');
                heightBar[0].setAttribute('y',  heightbar_top1_init);
              }

              if(position.percentage >= .334){
                angular.element(el).find('.icon.disponibilidad').addClass('animate');
              } else {
                angular.element(el).find('.icon.disponibilidad').removeClass('animate');
              }


              if(position.percentage >= .37){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .37);
                var diff =  position.amount - checkpoint;
                var heightBar = angular.element('#offer_2clipBottom1_rect');
                var rectPos = (heightbar_bottom1_init + diff);
                rectPos = rectPos > 605 ? 605 : rectPos
                heightBar[0].setAttribute('y',  rectPos);
              } else {
                var heightBar = angular.element('#offer_2clipBottom1_rect');
                heightBar[0].setAttribute('y',  heightbar_bottom1_init);
              }

              if(position.percentage >= .38){
                angular.element(el).find('.icon.capacidad').addClass('animate');
              } else {
                angular.element(el).find('.icon.capacidad').removeClass('animate');
              }


              if(position.percentage >= .47){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .47);
                var diff =  position.amount - checkpoint;
                var heightBar = angular.element('#offer_2clipTop2_rect');
                var rectPos = (heightbar_top2_init - diff);
                rectPos = rectPos < 351 ? 351 : rectPos
                heightBar[0].setAttribute('y',  rectPos);
              } else {
                var heightBar = angular.element('#offer_2clipTop2_rect');
                heightBar[0].setAttribute('y',  heightbar_top2_init);
              }

              if(position.percentage >= .46){
                angular.element(el).find('.icon.precio').addClass('animate');
              } else {
                angular.element(el).find('.icon.precio').removeClass('animate');
              }


              if(position.percentage >= .52){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .52);
                var diff =  position.amount - checkpoint;
                var heightBar = angular.element('#offer_2clipBottom2_rect');
                var rectPos = (heightbar_bottom2_init + diff);
                rectPos = rectPos > 605 ? 605 : rectPos
                heightBar[0].setAttribute('y',  rectPos);
              } else {
                var heightBar = angular.element('#offer_2clipBottom2_rect');
                heightBar[0].setAttribute('y',  heightbar_bottom2_init);
              }

              if(position.percentage >= .54){
                angular.element(el).find('.icon.flexibilidad').addClass('animate');
              } else {
                angular.element(el).find('.icon.flexibilidad').removeClass('animate');
              }



              if(position.percentage >= .57){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .57);
                var diff =  position.amount - checkpoint;
                var rightBar = angular.element('#offer_2clipRight_rect');
                var rectPos = (rightbar3_init + diff) * .8;
                rectPos = rectPos > 1812 ? 1812 : rectPos
                rightBar[0].setAttribute('x',  rectPos);
              } else {
                var rightBar = angular.element('#offer_2clipRight_rect');
                rightBar[0].setAttribute('x',  rightbar3_init);
              } 







              if(position.percentage > .61){
                var checkpoint = (angular.element(el).prop('offsetHeight')  * .61);
                //x_pos = -($window.innerWidth - (checkpoint - position.amount));
                //x_pos = x_pos <= -($window.innerWidth * 2) ? -($window.innerWidth * 2) : x_pos;
                var diff = position.amount - checkpoint;
                var duration = 800;
                x_pos = -($window.innerWidth + ((diff / duration) * $window.innerWidth));
                x_pos = x_pos <= -($window.innerWidth * 2) ? -($window.innerWidth * 2) : x_pos;
                setVendor($('#offer .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );
              }






              if(position.percentage >= .72){
                angular.element(el).find('.icon.leasing').addClass('animate');
              } else {
                angular.element(el).find('.icon.leasing').removeClass('animate');
              }

              if(position.percentage >= .73){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .73);
                var diff =  position.amount - checkpoint;
                var rightBar = angular.element('#offer_3clipTop_rect');
                var rectPos = (heightbar_top3_init + diff) * .8;
                rectPos = rectPos > 497 ? 497 : rectPos
                rightBar[0].setAttribute('y',  rectPos);
              } else {
                var rightBar = angular.element('#offer_3clipTop_rect');
                rightBar[0].setAttribute('y',  heightbar_top3_init);
              } 



              if(position.percentage >= .77){
                angular.element(el).find('.icon.service').addClass('animate');
              } else {
                angular.element(el).find('.icon.service').removeClass('animate');
              }

              if(position.percentage >= .77){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .77);
                var diff =  position.amount - checkpoint;
                var rightBar = angular.element('#offer_3clipRight_rect');
                var rectPos = (rightbar4_init + diff) * .8;
                rectPos = rectPos > 1364 ? 1364 : rectPos
                rightBar[0].setAttribute('x',  rectPos);
              } else {
                var rightBar = angular.element('#offer_3clipRight_rect');
                rightBar[0].setAttribute('x',  rightbar4_init);
              } 



              if(position.percentage >= .86){
                angular.element(el).find('.icon.renta').addClass('animate');
              } else {
                angular.element(el).find('.icon.renta').removeClass('animate');
              }










              if(position.amount > (angular.element(el).prop('offsetHeight') - $window.innerHeight)){
                var checkpoint = (angular.element(el).prop('offsetHeight') - $window.innerHeight);
                var diff = position.amount - checkpoint;
                var offset = position.amount - checkpoint;
                y_pos = -(offset);
                //setVendor($('#offer .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );

              }


              setVendor($('#offer .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );

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







