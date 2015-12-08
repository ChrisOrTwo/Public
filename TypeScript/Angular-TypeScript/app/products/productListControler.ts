module app.products {

	interface IProductListModel {
		title: string;
		showImage: boolean;
		products: app.domain.IProduct[];
		toggleImage(): void;
	}

	class ProductListControler implements IProductListModel {

		title: string;
		showImage: boolean;
		products: app.domain.IProduct[];

		static $inject = ["dataAccessService"];
		constructor(private dataAccessService: app.common.DataAccessService) {
			this.title = "Product List";
			this.showImage = false;
			this.products = [];
			var productResource = dataAccessService.getProductResource();
			productResource.query((data: app.domain.IProduct[]) => {
				this.products = data;
			});
		}

		toggleImage(): void {
			this.showImage = !this.showImage;
		}
	}

	angular.module("productManagement").controller("ProductListControler", ProductListControler)
}