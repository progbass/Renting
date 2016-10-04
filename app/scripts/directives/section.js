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
        scope.customScroll = 0;
        scope.inView = false;
        scope.isMobile = true;

        //
        var scroll_watcher;

        scope.$watch(function() { return el.hasClass('inView'); }, function(newValue, oldValue) {
          
          if(newValue){
            scroll_watcher = scope.$watch('scroll_position', function(newValue, oldValue) {

              if(!scope.isMobile)
                scope.$broadcast('draw');

            }, true);
          } else {
            el.find('.wrapper').toggleClass('fixed', false);

            if(scroll_watcher)
              scroll_watcher();
          }
        });


        angular.element($window).bind('resize', function(){
          scope.resizeSection();
          scope.$digest();
        });


        scope.draw = function(){}

        scope.resizeSection = function(){

          if($window.innerWidth > 700){
            scope.isMobile = false;

            var height = $window.innerHeight;
            if(scope.customScroll > $window.innerHeight)
              height = scope.customScroll;

            // set height
            el.height( $window.innerHeight + scope.customScroll );

          } else {
            scope.isMobile = true;
            
            // set height
            el.height( 'auto' );

          }
        }


        scope.getPosition = function(){
          var offset = $window.pageYOffset,
              windowTop = $window.pageYOffset,
              windowHeight = $window.outerHeight;

          var sectionTop = angular.element(el).prop('offsetTop'),
              sectionHeight = angular.element(el).prop('offsetHeight'),
              sectionMidpoint = sectionTop + sectionHeight/2,
              sectionBottom = sectionTop + sectionHeight,
              windowMidpoint = windowTop + windowHeight/2,
              windowBottom = windowTop + windowHeight;

          var change = (windowTop-sectionTop)/(sectionHeight);

          return {percentage: change, total: offset, amount: (windowTop-sectionTop)};
        }
      }
    }
})
.directive('home', function($window){
    return{
      require: '^viewport',
      templateUrl: 'views/main.html',
      scope: true,
      controller: ['$scope', '$sce', '$element', 'appServices', function($scope, $sce, $element, appServices){
        var controller =  this;
        $scope.API = null;
        controller.config = {
          sources: [
            {src: $sce.trustAsResourceUrl("video/casanova_final_converted.mp4"), type: "video/mp4"},
            {src: $sce.trustAsResourceUrl("video/casanova_final_converted.webm"), type: "video/webm"},
            {src: $sce.trustAsResourceUrl("video/casanova_final_converted.ogg"), type: "video/ogg"}
          ],
          theme: "bower_components/videogular-themes-default/videogular.css",
          plugins: {
            poster: "images/video_poster.jpg"
          }
        };

        controller.onPlayerReady = function(API) {
          $scope.API = API;
        };


        controller.closeVideo = function(API) {
          //Enable Window Scroll
          appServices.enableScroll();

          // Stop Video
          $scope.API.stop();

          // Hide Video Container
          $element.find('.video_container')
          .toggleClass('visible', false);

          // Send to back
          $element.find('.wrapper').css('z-index', 10);
        };


        controller.playVideo = function(){
          //Disable Window Scroll
          appServices.disableScroll();

          // Update Video Status
          $scope.API.isCompleted = false;

          // Show Video Container
          $element.find('.video_container')
          .toggleClass('visible', true);

          // Send to front
          $element.find('.wrapper').css('z-index', 100);

          // Play Video
          $scope.API.play();
        }

        $scope.$watch(
            function() {
              //console.log($scope.API.isCompleted)
              return $scope.API.isCompleted;
            },
            function(lastValue, newValue){
              if(!newValue)
                setTimeout(controller.closeVideo, 1200)
            }
        );
      }],


      controllerAs: 'homeCtrl',


      link: function(scope, el, attrs, test) {
        scope.customScroll = 600;

        var topbar_init = parseInt(angular.element('#landingClipRectTop')[0].getAttribute('y'), 10);


        var draw = function(position){
          var topBar = angular.element('#landingClipRectTop');
          var rectPos = (topbar_init + position.amount) * .7;
          rectPos = rectPos > 800 ? 800 : rectPos
          topBar[0].setAttribute('y',  rectPos);


          // Pin Content Holder
          el.find('.wrapper').toggleClass('fixed', true);

          // Animation Control
          if(position.percentage < 0){
              //$('#home .wrapper').toggleClass('fixed', false);

          } else {

            var x_pos = 0;
            var y_pos = 0;
              
            var checkpoint = angular.element(el).prop('offsetHeight') - $window.innerHeight;
            if(position.amount >=  checkpoint){

                var offset = position.amount - checkpoint;
                y_pos = -(offset);
                y_pos = position.percentage >= 1 ? -$window.innerHeight : y_pos;

            }

            setVendor($('#home .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );

          }
        };


        // Draw Scene
        scope.resizeSection(el);
        scope.$on('draw',function(event) {
           draw(scope.getPosition());
        });
      }
    }
});







