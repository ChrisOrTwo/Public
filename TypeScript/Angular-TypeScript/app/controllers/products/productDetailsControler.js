var app;
(function (app) {
    var products;
    (function (products) {
        var ProductDetailsController = (function () {
            function ProductDetailsController(dataAccessService, $routeParams) {
                var _this = this;
                this.dataAccessService = dataAccessService;
                this.$routeParams = $routeParams;
                this.title = "Product Detail";
                var productResource = dataAccessService.getProductResource();
                productResource.get($routeParams, function (data) { _this.product = data; });
            }
            ProductDetailsController.$inject = ["dataAccessService", "$routeParams"];
            return ProductDetailsController;
        })();
        products.ProductDetailsController = ProductDetailsController;
        angular.module("productManagement").controller(ProductDetailsController);
    })(products = app.products || (app.products = {}));
})(app || (app = {}));
