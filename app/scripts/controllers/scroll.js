'use strict';

/**
 * @ngdoc function
 * @name desarrolloApp.controller:ScrollCtrl
 * @description
 * # ScrollCtrl
 * Controller of the desarrolloApp
 */
angular.module('app')
.controller('ScrollCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
	// Properties
    $scope.scenes = Array('home', 'about', 'offer', 'leasing', 'contact');
    $scope.color = Array(0, 1, 2, 0, 1);
    $scope.slide = 0;
    $scope.change = 0;
    $scope.scroll_position = $window.pageYOffset;

    // Watchers...
    $scope.$watch("slide", function(newValue, oldValue) {
        if (newValue !== 0 && newValue !== "" && newValue !== $scope.scenes.length) {
            $location.path($scope.scenes[newValue]);

            angular.element('header .logo').removeClass('color0');
            angular.element('header .logo').removeClass('color1');
            angular.element('header .logo').removeClass('color2');
            angular.element('header .logo').addClass('color'+newValue);
        } else {
            $location.path('/');

            angular.element('header .logo').removeClass('color0');
            angular.element('header .logo').removeClass('color1');
            angular.element('header .logo').removeClass('color2');
            angular.element('header .logo').addClass('color0');
        };
    });
}])