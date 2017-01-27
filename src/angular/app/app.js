var restaurantApp = angular.module('restaurantApp', ['appControllers', 'ngRoute', 'appServices', 'ui.bootstrap', 'ngAnimate', 'ngSanitize']);

restaurantApp.config(['$routeProvider', ($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: '/views/home.html',
            controller: 'homeController'
        })
        .when('/menu', {
            templateUrl: 'views/menu.html',
            controller: 'menuController'
        })
        .when('/order', {
            templateUrl: 'views/order.html',
            controller: 'orderController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'contactController'
        })
        .when('/reservation', {
            templateUrl: 'views/table-reservation.html',
            controller: 'tableReservationController'
        })
        .when('/detail/:productId', {
            templateUrl: 'views/product-detail.html',
            controller: 'productDetailController'
        })
        .otherwise({redirectTo: '/'});
}]);
