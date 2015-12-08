var app;
(function (app) {
    var main = angular.module("productManagement", ["ngRoute", "common.services", "productResourceMock"]);
    main.config(routeConfig);
    routeConfig.$inject = ["$routeProvider"];
    function routeConfig($routeProvider) {
        $routeProvider
            .when("/productList", {
            templateUrl: "/app/views/products/productListView.html",
            controller: app.products.ProductListController,
        })
            .when("/productDetails/:productId", {
            templateUrl: "/app/views/products/productDetailView.html",
            controller: app.products.ProductDetailsController,
            controllerAs: "vm"
        })
            .otherwise("/productList");
    }
})(app || (app = {}));
