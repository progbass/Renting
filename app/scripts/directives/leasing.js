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

          angular.element('#leasing .wrapper').animate({ left: controller.x_pos });
          //setVendor($('#leasing .wrapper')[0], 'transform', 'translate3d('+(controller.x_pos)+'px, 0px, 0px)' );
        }

        controller.changeProduct = function(_target){
          appServices.changeProduct(_target);
        }

        $scope.$watch(function(){ return appServices.getProduct()}, controller.repositionHolder);
      }],

      controllerAs: 'leasingCtrl',

      link: function(scope, el, attrs) {
          scope.customScroll = 5500;



          var barH_1top_init = parseInt(angular.element("#leasing_1clipRight1_rect")[0].getAttribute('x'), 10);
          var barH_1bottom_init = parseInt(angular.element("#leasing_1clipRight2_rect")[0].getAttribute('x'), 10);
          var barV_1top_init = parseInt(angular.element("#leasing_1clipTop_rect")[0].getAttribute('y'), 10);

          var fsl_left1_init = parseInt(angular.element("#leasing_2clipRight1_rect")[0].getAttribute('x'), 10);
          var fsl_left2_init = parseInt(angular.element("#leasing_2clipRight2_rect")[0].getAttribute('x'), 10);
          var fsl_left3_init = parseInt(angular.element("#leasing_2clipRight3_rect")[0].getAttribute('x'), 10);


          var draw = function(position){
            
            if(position.percentage < 0){
              $('#leasing .wrapper').toggleClass('fixed', false);

            } else {
              var y_pos = 0;
              var x_pos = 0;//scope.leasingCtrl.x_pos;
              $('#leasing .wrapper').toggleClass('fixed', true);
              



              if(position.percentage >= .05){
                angular.element(el).find('.leasing').addClass('animate');
              } else {
                angular.element(el).find('.leasing').removeClass('animate');
              }


              if(position.percentage >= .12){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .12);
                var diff =  position.amount - checkpoint;

                var leftbar_leasing = angular.element('#leasing_1clipRight1_rect');
                var rightbar_leasing = angular.element('#leasing_1clipRight2_rect');

                var left_pos = (barH_1top_init - diff);
                var right_pos = (barH_1bottom_init + diff);

                left_pos = left_pos < 537 ? 537 : left_pos;
                right_pos = right_pos > 1256 ? 1256 : right_pos;

                leftbar_leasing[0].setAttribute('x',  left_pos);
                rightbar_leasing[0].setAttribute('x',  right_pos);
                
              } else {
                var leftbar_leasing = angular.element('#leasing_1clipRight1_rect');
                var rightbar_leasing = angular.element('#leasing_1clipRight2_rect');
                leftbar_leasing[0].setAttribute('x',  barH_1top_init);
                rightbar_leasing[0].setAttribute('x',  barH_1bottom_init);
              } 



              //////////////////////////////
              /// LEASING ICONS
              if(position.percentage >= .14){
                angular.element(el).find('.kms .frame1').addClass('animate');
              } else {
                angular.element(el).find('.kms .frame1').removeClass('animate');
              }

              if(position.percentage >= .18){
                angular.element(el).find('.seguro .frame2').addClass('animate');
              } else {
                angular.element(el).find('.seguro .frame2').removeClass('animate');
              }
              if(position.percentage >= .19){
                angular.element(el).find('.tramites .frame4').addClass('animate');
              } else {
                angular.element(el).find('.tramites .frame4').removeClass('animate');
              }

              if(position.percentage >= .22){
                angular.element(el).find('.seguro .frame3').addClass('animate');
              } else {
                angular.element(el).find('.seguro .frame3').removeClass('animate');
              }
              if(position.percentage >= .23){
                angular.element(el).find('.tramites .frame5').addClass('animate');
              } else {
                angular.element(el).find('.tramites .frame5').removeClass('animate');
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






              //////////////////////////////
              /// FSL
              if(position.percentage >= .08){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .08);
                var diff =  position.amount - checkpoint;

                var leftbar_fsl = angular.element('#leasing_2clipRight1_rect');
                var fsl_left_post = (fsl_left1_init + diff) * 1.2;
                fsl_left_post = fsl_left_post >= 535 ? 535 : fsl_left_post;
                leftbar_fsl[0].setAttribute('x',  fsl_left_post);
                
              } else {
                var leftbar_fsl = angular.element('#leasing_2clipRight1_rect');
                leftbar_fsl[0].setAttribute('x',  fsl_left1_init);
              } 



              if(position.percentage >= .13){
                angular.element(el).find('.fsl .frame.frame1').addClass('animate');
              } else {
                angular.element(el).find('.fsl .frame.frame1').removeClass('animate');
              }
              if(position.percentage >= .2){
                angular.element(el).find('.fsl .frame.frame2').addClass('animate');
              } else {
                angular.element(el).find('.fsl .frame.frame2').removeClass('animate');
              }
              if(position.percentage >= .27){
                angular.element(el).find('.fsl .frame.frame3').addClass('animate');
              } else {
                angular.element(el).find('.fsl .frame.frame3').removeClass('animate');
              }



              if(position.percentage >= .31){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .31);
                var diff =  position.amount - checkpoint;

                var leftbar_fsl = angular.element('#leasing_2clipRight2_rect');
                var fsl_left_post = (fsl_left2_init - diff) * 1.2;
                fsl_left_post = fsl_left_post <= 535 ? 535 : fsl_left_post;
                leftbar_fsl[0].setAttribute('x',  fsl_left_post);
                
              } else {
                var leftbar_fsl = angular.element('#leasing_2clipRight2_rect');
                leftbar_fsl[0].setAttribute('x',  fsl_left2_init);
              }




              if(position.percentage >= .39){
                angular.element(el).find('.fsl .frame.frame6').addClass('animate');
              } else {
                angular.element(el).find('.fsl .frame.frame6').removeClass('animate');
              }
              if(position.percentage >= .46){
                angular.element(el).find('.fsl .frame.frame5').addClass('animate');
              } else {
                angular.element(el).find('.fsl .frame.frame5').removeClass('animate');
              }
              if(position.percentage >= .55){
                angular.element(el).find('.fsl .frame.frame4').addClass('animate');
              } else {
                angular.element(el).find('.fsl .frame.frame4').removeClass('animate');
              }




              if(position.percentage >= .555){
                angular.element(el).find('.fsl .plus_icon').addClass('animate');
              } else {
                angular.element(el).find('.fsl .plus_icon').removeClass('animate');
              }


              if(position.percentage >= .56){
                var checkpoint = (angular.element(el).prop('offsetHeight') * .56);
                var diff =  position.amount - checkpoint;

                var leftbar_fsl = angular.element('#leasing_2clipRight3_rect');
                var fsl_left_post = (fsl_left3_init + diff) * 1.2;
                fsl_left_post = fsl_left_post >= 535 ? 535 : fsl_left_post;
                leftbar_fsl[0].setAttribute('x',  fsl_left_post);
                
              } else {
                var leftbar_fsl = angular.element('#leasing_2clipRight3_rect');
                leftbar_fsl[0].setAttribute('x',  fsl_left3_init);
              }






              //////////////////////////////
              /// OUTRO
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

          
          // Draw Scene
          scope.resizeSection(el);
          scope.$on('draw',function(event) {
             draw(scope.getPosition());
          });
      }
    }
});







