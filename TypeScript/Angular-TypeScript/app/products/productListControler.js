var app;
(function (app) {
    var products;
    (function (products) {
        var ProductListControler = (function () {
            function ProductListControler(dataAccessService) {
                var _this = this;
                this.dataAccessService = dataAccessService;
                this.title = "Product List";
                this.showImage = false;
                this.products = [];
                var productResource = dataAccessService.getProductResource();
                productResource.query(function (data) {
                    _this.products = data;
                });
            }
            ProductListControler.prototype.toggleImage = function () {
                this.showImage = !this.showImage;
            };
            ProductListControler.$inject = ["dataAccessService"];
            return ProductListControler;
        })();
        angular.module("productManagement").controller("ProductListControler", ProductListControler);
    })(products = app.products || (app.products = {}));
})(app || (app = {}));
