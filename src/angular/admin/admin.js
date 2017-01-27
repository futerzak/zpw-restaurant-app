var restaurantAdminApp = angular.module('restaurantAdminApp', ['appControllers', 'appServices', 'ngRoute', 'ui.bootstrap', 'ngAnimate', 'ngSanitize']);

restaurantAdminApp.config(['$routeProvider', ($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: '/admin/views/home.html',
            controller: 'homeController'
        })
        .when('/menu', {
            templateUrl: '/admin/views/menu.html',
            controller: 'menuController'
        })
        .when('/product/edit/:productId', {
            templateUrl: '/admin/views/product-edit.html',
            controller: 'productEditController'
        })
        .when('/orders', {
            templateUrl: '/admin/views/orders.html',
            controller: 'ordersController'
        })
        .when('/order/detail/:orderId', {
            templateUrl: '/admin/views/order-detail.html',
            controller: 'orderDetailController'
        })
        .when('/add-product', {
            templateUrl: '/admin/views/product-add.html',
            controller: 'addProductController'
        })
        .otherwise({redirectTo: '/'});
}]);
