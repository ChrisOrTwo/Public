namespace app.products {

	interface IProductListModel {
		title: string;
		showImage: boolean;
		products: app.domain.IProduct[];
		toggleImage(): void;
	}

	export class ProductListController {

		title: string;
		showImage: boolean;
		products: app.domain.IProduct[];

		static $inject = ["dataAccessService"];
		constructor(private dataAccessService: app.common.DataAccessService) {

			this.title = "Product List";
			this.showImage = false;
			this.products = [];
			this.toggleImage = this.toggleImage;

			var productResource = dataAccessService.getProductResource();
			productResource.query(data => { this.products = data; });

		}

		toggleImage(): void {
			this.showImage = !this.showImage;
		}
	}

	angular.module("productManagement").controller(ProductListController);
}