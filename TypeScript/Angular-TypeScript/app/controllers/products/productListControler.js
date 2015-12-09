var app;
(function (app) {
    var products;
    (function (products) {
        var ProductListController = (function () {
            function ProductListController(dataAccessService) {
                var _this = this;
                this.dataAccessService = dataAccessService;
                this.title = "Product List";
                this.showImage = false;
                this.products = [];
                this.toggleImage = this.toggleImage;
                var productResource = dataAccessService.getProductResource();
                productResource.query(function (data) { _this.products = data; });
            }
            ProductListController.prototype.toggleImage = function () {
                this.showImage = !this.showImage;
            };
            ProductListController.$inject = ["dataAccessService"];
            return ProductListController;
        })();
        products.ProductListController = ProductListController;
        angular.module("productManagement").controller(ProductListController);
    })(products = app.products || (app.products = {}));
})(app || (app = {}));
