namespace app {

	var main = angular.module("productManagement", ["ngRoute", "common.services", "productResourceMock"]);

	main.config(routeConfig);

	routeConfig.$inject = ["$routeProvider"]
	function routeConfig($routeProvider: ng.route.IRouteProvider): void {
		$routeProvider
			.when("/productList", {
				templateUrl: "/app/views/products/productListView.html",
				controller: app.products.ProductListController,
				controllerAs: "vm"
			})
			.when("/productDetails/:productId", {
				templateUrl: "/app/views/products/productDetailView.html",
				controller: app.products.ProductDetailsController,
				controllerAs: "vm"
			})
			.otherwise("/productList");
	}
}