var app;
(function (app) {
    var main = angular.module("productManagement", ["ngRoute", "common.services", "productResourceMock"]);
    main.config(routeConfig);
    routeConfig.$inject = ["$routeProvider"];
    function routeConfig($routeProvider) {
        $routeProvider
            .when("/productList", {
            templateUrl: "/app/products/productListView.html",
            controller: "ProductListControler as vm"
        })
            .when("/productDetails/:productId", {
            templateUrl: "/app/products/productDetailView.html",
            controller: "ProductDetailsControler as vm"
        })
            .otherwise("/productList");
    }
})(app || (app = {}));
