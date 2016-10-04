
(function() {
    'use strict';


    /**
    * @ngdoc overview
    * @name desarrolloApp
    * @description
    * # desarrolloApp
    *
    * Main module of the application.
    */
    var app = angular.module('app',[
        'ngAnimate',
        'ngRoute',
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls",
        "com.2fdevs.videogular.plugins.overlayplay",
        "com.2fdevs.videogular.plugins.poster"
    ])
    .config(config);


    app.service('appServices', function() {
      var scope = this;
      scope.product = 'leasing';

      scope.changeProduct = function(_target) {
        // Change Product
        scope.product = _target;

        var distance_offset = $("#leasing").height()*.5;
        if(_target == 'service')
          distance_offset = $("#leasing").height()*.8; 

        // Scroll To Section
        scope.anchorScroll( angular.element('#offer'), angular.element("#leasing"), 120, distance_offset);
      };

      scope.getProduct = function() {
        return scope.product;
      };

      scope.disableScroll = function() {
        angular.element('html').css({
          'overflow': 'hidden',
          'height': '100%'
        })
      };

      scope.enableScroll = function() {
        angular.element('html').css({
          'overflow': 'auto',
          'height': 'auto'
        })
      };




      scope.anchorScroll = function(this_obj, that_obj, base_speed, _offset) {
        var offet = _offset ? _offset : 0;
        var this_offset = this_obj.offset();
        var that_offset = that_obj.offset();
        var offset_diff = Math.abs(that_offset.top - this_offset.top);
       
        var speed       = (offset_diff * base_speed) / 1200;
       


        // Disable Scroll
        //scope.disableScroll();


        angular.element('body').animate({
            scrollTop: that_offset.top + offet
          },
          {
            duration: speed,
            easing: 'easeInOutSine'
        }, function(){
           // Enable Scroll
          //scope.enableScroll();
        });
      }
      
    });



    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
          .when('/', {
            controller: 'MainCtrl',
          })
          .when('/about', {
            controller: 'AboutCtrl',
          })
          .when('/offer', {
            controller: 'OfferCtrl',
          })
          .when('/leasing', {
            controller: 'LeasingCtrl',
          })
          .when('/contact', {
            controller: 'ContactCtrl',
          })
          .when('/faqs', {
            controller: 'FaqsCtrl',
          })
          .otherwise({
            redirectTo: '/'
          });
    }


})();




function setVendor(element, property, value) {
  element.style['-webkit-' + property] = value;
  element.style['-moz-' + property] = value;
  element.style['-ms-' + property] = value;
  element.style['-o-' + property] = value;
}