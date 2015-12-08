module app.products {

	interface IProductDetailsModel {
		product: app.domain.IProduct
		title: string
	}

	interface IProductParams extends ng.route.IRouteParamsService {
		productId: number
	}

	class ProductDetailsControler implements IProductDetailsModel {
		
		product: app.domain.IProduct;
		title: string;

		static $inject =["dataAccessService","$routeParams"];
		constructor(private dataAccessService: app.common.DataAccessService,private $routeParams: IProductParams) {

			this.title = "Product Detail";
			
			var productResource = dataAccessService.getProductResource();
			productResource.get({ productId: $routeParams.productId }, (data: app.domain.IProduct) => {
				
				this.product = data;

			});
		}
	}

	angular.module("productManagement").controller("ProductDetailsControler", ProductDetailsControler);
}