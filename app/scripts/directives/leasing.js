'use strict';

/**
 * @ngdoc function
 * @name desarrolloApp.directive:section
 * @description
 * # section
 * Directive of the desarrolloApp
 */
angular.module('app')
.directive('leasing', function($window){
    return{
      require: '^viewport',
      scope: true,
      templateUrl: 'views/leasing.html',
      controller: ['$scope', 'appServices', function($scope, appServices){
        var controller = this;
        controller.x_pos = 0;
        
        controller.repositionHolder = function(_target){
          controller.x_pos = 0;
          if(_target == 'service'){
            controller.x_pos = -$window.innerWidth;
          }

          setVendor($('#leasing .wrapper')[0], 'transform', 'translate3d('+(controller.x_pos)+'px, 0px, 0px)' );
        }

        controller.changeProduct = function(_target){
          appServices.changeProduct(_target);
        }

        $scope.$watch(function(){ return appServices.getProduct()}, controller.repositionHolder);
      }],

      controllerAs: 'leasingCtrl',

      link: function(scope, el, attrs) {
          scope.customScroll = 4000;



          var barH_1top_init = parseInt(angular.element("#leasing_1clipRight1_rect")[0].getAttribute('x'), 10);
          var barH_1bottom_init = parseInt(angular.element("#leasing_1clipRight2_rect")[0].getAttribute('x'), 10);
          var barV_1top_init = parseInt(angular.element("#leasing_1clipTop_rect")[0].getAttribute('y'), 10);


          var draw = function(position){
            //console.log(position.amount+'    '+position.percentage)
            
            if(position.percentage < 0){
              $('#leasing .wrapper').toggleClass('fixed', false);

            } else {
              var y_pos = 0;
              var x_pos = scope.leasingCtrl.x_pos;
              $('#leasing .wrapper').toggleClass('fixed', true);
              





              if(position.percentage >= .05){
                angular.element(el).find('.leasing').addClass('animate');
              } else {
                angular.element(el).find('.leasing').removeClass('animate');
              }


              if(position.percentage >= .12){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .12);
                var diff =  position.amount - checkpoint;
                var leftbar = angular.element('#leasing_1clipRight1_rect');
                var rightbar = angular.element('#leasing_1clipRight2_rect');
                var left_pos = (barH_1top_init - diff);
                var right_pos = (barH_1bottom_init + diff);

                left_pos = left_pos < 537 ? 537 : left_pos;
                right_pos = right_pos > 1256 ? 1256 : right_pos;

                leftbar[0].setAttribute('x',  left_pos);
                rightbar[0].setAttribute('x',  right_pos);
              } else {
                var leftbar = angular.element('#leasing_1clipRight1_rect');
                var rightbar = angular.element('#leasing_1clipRight2_rect');

                leftbar[0].setAttribute('x',  barH_1top_init);
                rightbar[0].setAttribute('x',  barH_1bottom_init);
              } 

              if(position.percentage >= .14){
                angular.element(el).find('.kms').addClass('animate');
              } else {
                angular.element(el).find('.kms').removeClass('animate');
              }

              if(position.percentage >= .22){
                angular.element(el).find('.seguro').addClass('animate');
              } else {
                angular.element(el).find('.seguro').removeClass('animate');
              }

              if(position.percentage >= .23){
                angular.element(el).find('.tramites').addClass('animate');
              } else {
                angular.element(el).find('.tramites').removeClass('animate');
              }




              if(position.percentage >= .32){
                angular.element(el).find('.nav').addClass('animate');
              } else {
                angular.element(el).find('.nav').removeClass('animate');
              }





              if(position.percentage >= .76){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .76);
                var diff =  (position.amount - checkpoint) * .7;
                var topbar = angular.element('#leasing_1clipTop_rect');
                var top_pos = (barV_1top_init + diff);

                top_pos = top_pos > 1030 ? 1030 : top_pos;
                topbar[0].setAttribute('y',  top_pos);
              } else {
                var topbar = angular.element('#leasing_1clipTop_rect');
                topbar[0].setAttribute('y',  barV_1top_init);
              } 








              if(position.amount > (angular.element(el).prop('offsetHeight') - $window.innerHeight)){
                var checkpoint = (angular.element(el).prop('offsetHeight') - $window.innerHeight);
                var diff = position.amount - checkpoint;
                var offset = position.amount - checkpoint;
                y_pos = -(offset);
                //setVendor($('#leasing .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );

              }


              setVendor($('#leasing .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );







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







