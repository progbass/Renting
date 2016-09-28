
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
        scope.product = _target;
      };

      scope.getProduct = function() {
        return scope.product;
      };
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



function anchorScroll(this_obj, that_obj, base_speed, _offset) {
  var offet = _offset ? _offset : 0;
  var this_offset = this_obj.offset();
  var that_offset = that_obj.offset();
  var offset_diff = Math.abs(that_offset.top - this_offset.top);
 
  var speed       = (offset_diff * base_speed) / 1200;
 

  $('html,body').animate({
      scrollTop: that_offset.top + offet
    },
    {
      duration: speed,
      easing: 'easeInOutSine'
    });
}

function setVendor(element, property, value) {
  element.style['-webkit-' + property] = value;
  element.style['-moz-' + property] = value;
  element.style['-ms-' + property] = value;
  element.style['-o-' + property] = value;
}