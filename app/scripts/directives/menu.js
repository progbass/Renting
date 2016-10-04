'use strict';

/**
 * @ngdoc function
 * @name desarrolloApp.directive:section
 * @description
 * # section
 * Directive of the desarrolloApp
 */
angular.module('app')
.directive('mainMenu', ['$location', '$window', 'appServices', function($location, $window, appServices){return{

      scope: true,
      controller: ['$scope', function($scope){
        $scope.isOpen = false;

        $scope.toggleMenu = function(_flag){
          angular.element('#main_container').toggleClass('slided', _flag);
          
          if(_flag){
            // Disable Scroll
            appServices.disableScroll();

            // Hide Icon
            angular.element('#main_container a.menu_icon').fadeOut(120);

          } else {
            // Enable Scroll
            appServices.enableScroll();

            // Show Icon
            angular.element('#main_container a.menu_icon').fadeIn();
          }
        }


      }],
      controllerAs: 'menuCtrl',
      link: function(scope, el, attrs) {


          scope.$watch('isOpen', function(newValue){
            scope.toggleMenu(newValue)
          }, true);


          angular.element("#main_container").find('#content_column a.logo, #menu_column nav a').click(function(_e){
            _e.preventDefault();

            var root = this;
            var target = ($(root).attr('href').substr(2));
            angular.element("#menu_column nav a").removeClass('active');
            $(root).addClass('active');

            var speed =  600;
            if($("#"+target).offset().top < $(root).offset().top)
              speed =  300;

            var time_offset = 0;
            //if(target != 'home')
              //time_offset = 400;
              //
            
            // Offsets
            var distance_offset = 0;
            switch(target){
              case 'home':
                distance_offset = $("#"+target).height() - $window.innerHeight;
                break;

              case 'about':
                distance_offset = $("#"+target).height()*.4;
                break;

              case 'offer':
                distance_offset = $("#"+target).height()*.2;
                break;

              case 'leasing':
                distance_offset = $("#"+target).height()*.5;
                break;

              case 'contact':
                distance_offset = $("#"+target).height()*.5;
                break;

              default:
                distance_offset = 0;
            }

            if(scope.$parent.isMobile)
                distance_offset = 0;


            $location.path(target);
            scope.isOpen = false;
            console.log(scope.$parent.slide)
            setTimeout(function(){
              appServices.anchorScroll( $(root), $("#"+target), speed, distance_offset );
            }, time_offset);
          });
      }
    }
}]);







