var appControllers = angular.module('appControllers', []);

appControllers.controller('homeController', function($location, $rootScope, $scope){
    $rootScope.pageTitle = "Strona domowa";

    $scope.submit = () => {
        if($scope.login && $scope.pass) {
            if ($scope.login == "futer" && $scope.pass == '123123' || $rootScope.logged == true) {
                $rootScope.logged = true;
                $location.path('#/');
            }
        }
    }
});

appControllers.controller('menuController', function($rootScope, $scope, dataService){
    $rootScope.pageTitle = "Zarządzanie menu";

    dataService.getData('/products')
        .then(response => {
            $scope.products = response.data;
        })

});

appControllers.controller('productEditController', function($rootScope, $scope, dataService, $routeParams) {
    $rootScope.pageTitle = "Modyfikacja produktu"
    dataService.getData('/products')
        .then(response => {
            angular.forEach(response.data, (product, key) => {
                if(product._id === $routeParams.productId) {
                    $scope.product = product;
                }
            })
        });

    $scope.submit = () => {
        dataService.sendData('/admin/product', {
            name: $scope.product.name,
            price: $scope.product.price,
            desc: $scope.product.desc,
            stars: $scope.product.stars,
            thumbnailUrl: $scope.product.thumbnailUrl,
            imageUrl: $scope.product.imageUrl
        })
        .then(response => {
            console.log(response);
        });
    }
})

appControllers.controller('ordersController', function($rootScope, $scope, dataService) {
    $rootScope.pageTitle = "Zamówienia";


    dataService.getData('/admin/orders')
        .then(response => {
            $scope.orders = response.data;
        });
})

appControllers.controller('orderDetailController', function($rootScope, $scope, dataService, $routeParams){
    $rootScope.pageTitle = "Szczegóły zamówienia";

    // dataService.getData('/products').then(response => {
    //     return response.data;
    // })

    dataService.getData('/admin/orders')
        .then(response => {
            angular.forEach(response.data, (order, key) => {
                if(order._id === $routeParams.orderId) {
                    $scope.order = order;
                }
            })
        });
})

appControllers.controller('addProductController', function($rootScope, $scope, dataService, $routeParams) {
    $rootScope.pageTitle = "Dodaj produkt";

    $scope.submit = () => {
        if($scope.product.name && $scope.product.price) {
            dataService.sendData('/admin/product', {
                name: $scope.product.name,
                price: $scope.product.price,
                desc: $scope.product.desc,
                stars: $scope.product.stars,
                thumbnailUrl: $scope.product.thumbnailUrl,
                imageUrl: $scope.product.imageUrl
            })
        }
    }

});
