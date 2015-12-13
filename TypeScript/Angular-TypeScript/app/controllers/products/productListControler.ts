namespace app.products {

	interface IProductListModel {
		title: string;
		showImage: boolean;
		products: app.domain.IProduct[];
		toggleImage(): void;
	}

	export class ProductListController implements IProductListModel {

		public static $inject = ["dataAccessService"];
		constructor(private dataAccessService: app.common.DataAccessService) {

			this.title = "Product ListXXX";
			this.showImage = true;
			this.products = [];
			this.toggleImage = this.toggleImage;

			let t = new Test2();
			alert(t.test.value);

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