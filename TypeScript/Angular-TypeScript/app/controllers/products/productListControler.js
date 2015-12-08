var app;
(function (app) {
    var products;
    (function (products) {
        var ProductListController = (function () {
            function ProductListController($scope, dataAccessService) {
                this.$scope = $scope;
                this.dataAccessService = dataAccessService;
                $scope.title = "Product List";
                $scope.showImage = false;
                $scope.products = [];
                $scope.toggleImage = this.toggleImage;
                var productResource = dataAccessService.getProductResource();
                productResource.query(function (data) { $scope.products = data; });
            }
            ProductListController.prototype.toggleImage = function () {
                this.$scope.showImage = !this.$scope.showImage;
            };
            // title: string;
            // showImage: boolean;
            // products: app.domain.IProduct[];
            ProductListController.$inject = ["$scope", "dataAccessService"];
            return ProductListController;
        })();
        products.ProductListController = ProductListController;
        angular.module("productManagement").controller(ProductListController);
    })(products = app.products || (app.products = {}));
})(app || (app = {}));
