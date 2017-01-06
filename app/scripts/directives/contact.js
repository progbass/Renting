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
      controller: ['$scope', '$http', '$element', function($scope, $http, $el){
        // Form initial values
        $scope.name_txt = '';
        $scope.mail_txt = '';
        $scope.unidades_txt = '';
        $scope.marca_txt = '';
        $scope.modelo_txt = '';
        $scope.version_txt = '';
        $scope.equipo_txt = '';
        $scope.comments_txt = '';

        //
        $scope.submitForm = function(status) {

          var console = angular.element($el).find('.console');
          console.removeClass('error sucess');

          // Is the form valid?
          if(!status){
            console.addClass('error');

            // Name
            if($scope.contact_frm.name_txt.$invalid){
              console.html('Por favor, ingresa tu nombre.');
              return false;
            }

            // Email
            if($scope.contact_frm.mail_txt.$invalid){
              console.html('Ingresa una dirección de email válida.');
              return false;
            }

            // Unidades
            if($scope.contact_frm.unidades_txt.$invalid){
              console.html('Ingresa el número de unidades deseadas.');
              return false;
            }

            // Marca
            if($scope.contact_frm.marca_txt.$invalid){
              console.html('Ingresa la marca del vehículo.');
              return false;
            }

            // Modelo
            if($scope.contact_frm.modelo_txt.$invalid){
              console.html('Ingresa el modelo del vehículo.');
              return false;
            }

            return false;
          }


          var data = $.param({
            name_txt: $scope.name_txt,
            mail_txt: $scope.mail_txt,
            unidades_txt: $scope.unidades_txt,
            marca_txt: $scope.marca_txt,
            modelo_txt: $scope.modelo_txt,
            version_txt: $scope.version_txt,
            equipo_txt: $scope.equipo_txt,
            comments_txt: $scope.comments_txt
          });
          var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
          }

          var responsePromise = $http.post("contact.php", data, config);
          

          responsePromise.success(function(data, status, headers, config) {
              console.html(data.msg);

              if(!data.err){
                console.removeClass('error').addClass('success');
              } else {
                console.removeClass('success').addClass('error');
              }
          });
          responsePromise.error(function(data, status, headers, config) {
              console.removeClass('success').addClass('error');
              console.html(data.msg);
          });

          return false;
        }
      }],

      link: function(scope, el, attrs) {
          scope.customScroll = $window.innerWidth + 300;// + 1600;

          // MODAL WINDOW
          angular.element(el).find('.window').hide();
          scope.openModal = function(_target){
            // Get Desired Information Frame
            $(el).find('.frame').hide();
            $(el).find('.frame.'+_target).show();

            // Show window
            $(el).find('.window').fadeIn(160);
          }
          scope.closeModal = function(){
            // Close window
            $(el).find('.window').fadeOut(140);
          }

          

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



              //////////////////////////////
              /// OUTRO
              if(position.amount > (angular.element(el).prop('offsetHeight') - $window.innerHeight)){
                var checkpoint = (angular.element(el).prop('offsetHeight') - $window.innerHeight);
                var diff = position.amount - checkpoint;
                var offset = position.amount - checkpoint;
                y_pos = -(offset);
                //setVendor($('#leasing .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );

              }


              setVendor($('#contact .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );


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







