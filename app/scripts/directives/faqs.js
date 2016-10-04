'use strict';

/**
 * @ngdoc function
 * @name desarrolloApp.directive:section
 * @description
 * # section
 * Directive of the desarrolloApp
 */
angular.module('app')
.directive('faqs', function($window){
    return{
      require: '^viewport',
      scope: true,
      templateUrl: 'views/faqs.html',
      link: function(scope, el, attrs) {

          // MODAL WINDOW
          angular.element(el).find('.question').toggleClass('open', false);
          scope.openModal = function($event){
            var element = $event.currentTarget;

            angular.element('body').animate(
              {
                scrollTop: angular.element(element).offset().top 
              },
              {
                duration: 800,
                easing: 'easeInOutSine'
              }
            );

            if(angular.element(element).hasClass('open')){
              scope.closeModal();
              return;
            }

            angular.element(el).find('.question').fadeOut(200);

            setTimeout(function(){
              angular.element(element).fadeIn(200);
              angular.element(element).toggleClass('open', true);
            }, 600);
          }

          scope.closeModal = function(){
            angular.element(el).find('.question').fadeIn(200);
            angular.element(el).find('.question').toggleClass('open', false);
          }

          

          
          var draw = function(position){
            //console.log(position.amount+'    '+position.percentage)
            
            if(position.percentage <= 0){
              $('#faqs .wrapper').toggleClass('fixed', false);

            } else {
              var y_pos = 0;
              var x_pos = 0;
              $('#faqs .wrapper').toggleClass('fixed', true);

            }

          }


          // Draw Scene
          scope.resizeSection(el);
          scope.$on('draw',function(event) {
             //draw(scope.getPosition());
          });
      }
    }
});







