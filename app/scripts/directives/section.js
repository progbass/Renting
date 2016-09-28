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

        //
        var scroll_watcher;

        scope.$watch(function() { return el.hasClass('inView'); }, function(newValue, oldValue) {
          
          if(newValue){
            scroll_watcher = scope.$watch('scroll_position', function(newValue, oldValue) {
              scope.draw(scope.getPosition())
            }, true);
          } else {
            if(scroll_watcher)
              scroll_watcher();
          }
        });


        scope.draw = function(){}

        scope.resizeSection = function(el){
          var height = $window.innerHeight;
          if(scope.customScroll > $window.innerHeight)
            height = scope.customScroll;

          // set height
          el.height( $window.innerHeight + scope.customScroll );
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


        scope.draw(scope.getPosition());
      }
    }
})
.directive('home', function($window){
    return{
      require: '^viewport',
      templateUrl: 'views/main.html',
      controller: ['$scope', '$sce', '$element', function($scope, $sce, $element){
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
          //
          $element.find('.video_container')
          .toggleClass('visible', false);
          $scope.API.stop();
        };


        controller.playVideo = function(){
          $scope.API.isCompleted = false;

          $element.find('.video_container')
          .toggleClass('visible', true);
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
        scope.draw = function(position){
          var topBar = angular.element('#landingClipRectTop');
          var rectPos = (topbar_init + position.amount) * .7;
          rectPos = rectPos > 800 ? 800 : rectPos
          topBar[0].setAttribute('y',  rectPos);


          $('#home .wrapper').toggleClass('fixed', true);
          var x_pos = 0;
          var y_pos = 0;
          var checkpoint = angular.element(el).prop('offsetHeight') - $window.innerHeight;
          if(position.amount >=  checkpoint){
            var offset = position.amount - checkpoint;
            y_pos = -(offset);
          }


          setVendor($('#home .wrapper')[0], 'transform', 'translate3d('+(x_pos)+'px, '+(y_pos)+'px, 0px)' );

        };


        //Resize container
        scope.resizeSection(el);
        scope.draw(scope.getPosition());
      }
    }
});







