namespace app.products {

	interface IProductDetailsModel {
		product: app.domain.IProduct;
		title: string;
	}

	interface IProductParams extends ng.route.IRouteParamsService {
		productId: number;
	}

	interface IProductDetailsController {
		vm: IProductDetailsModel;
	}

	export class ProductDetailsController implements IProductDetailsModel {

		public static $inject = ["dataAccessService", "$routeParams"];

		constructor(private dataAccessService: app.common.DataAccessService, private $routeParams: IProductParams) {
			this.title = "Product Detail";
			let productResource = dataAccessService.getProductResource();
			productResource.get($routeParams, data => { this.product = data; });
		}

		public product: app.domain.IProduct;
		public title: string;
	}

	angular.module("productManagement").controller(ProductDetailsController);
}