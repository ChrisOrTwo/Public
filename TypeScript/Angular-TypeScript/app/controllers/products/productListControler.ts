namespace app.products {

	interface IProductListModel {
		title: string;
		showImage: boolean;
		products: app.domain.IProduct[];
		toggleImage(): void;
	}

	export class ProductListController {

		public static $inject = ["dataAccessService"];
		constructor(private dataAccessService: app.common.DataAccessService) {

			this.title = "Product List";
			this.showImage = false;
			this.products = [];
			this.toggleImage = this.toggleImage;

			let productResource = dataAccessService.getProductResource();
			productResource.query(data => { this.products = data; });

		}

		public title: string;
		public showImage: boolean;
		public products: app.domain.IProduct[];

		public toggleImage(): void {
			this.showImage = !this.showImage;
		}
	}

	angular.module("productManagement").controller(ProductListController);
}