var app;
(function (app) {
    var products;
    (function (products) {
        var ProductDetailsControler = (function () {
            function ProductDetailsControler(dataAccessService, $routeParams) {
                var _this = this;
                this.dataAccessService = dataAccessService;
                this.$routeParams = $routeParams;
                this.title = "Product Detail";
                var productResource = dataAccessService.getProductResource();
                productResource.get({ productId: $routeParams.productId }, function (data) {
                    _this.product = data;
                });
            }
            ProductDetailsControler.$inject = ["dataAccessService", "$routeParams"];
            return ProductDetailsControler;
        })();
        angular.module("productManagement").controller("ProductDetailsControler", ProductDetailsControler);
    })(products = app.products || (app.products = {}));
})(app || (app = {}));
