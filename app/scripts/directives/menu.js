'use strict';

/**
 * @ngdoc function
 * @name desarrolloApp.directive:section
 * @description
 * # section
 * Directive of the desarrolloApp
 */
angular.module('app')
.directive('mainMenu', ['$location', function($location){return{

      scope: true,
      controller: ['$scope', function($scope){
        $scope.isOpen = false;

        $scope.toggleMenu = function(_flag){
          angular.element('#main_container').toggleClass('slided', _flag);
          
          if(_flag){
            angular.element('#main_container a.menu_icon').fadeOut(120);
          } else {
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
            var speed =  600;
            if($("#"+target).offset().top < $(root).offset().top)
              speed =  300;

            var time_offset = 0;
            if(target != 'home')
              time_offset = 400;

            setTimeout(function(){
              anchorScroll( $(root), $("#"+target), speed, 450 );
            }, time_offset);


            $location.path(target);
            scope.isOpen = false;
          });
      }
    }
}]);







