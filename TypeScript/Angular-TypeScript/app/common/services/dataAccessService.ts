namespace app.common {

	interface IDataAccessService {
		getProductResource(): ng.resource.IResourceClass<IProductResource>;
	}

	interface IProductResource extends ng.resource.IResource<app.domain.IProduct> {

	}

	export class DataAccessService implements IDataAccessService {

		public static $inject = ["$resource"];
		constructor(private $resource: ng.resource.IResourceService) { }

		public getProductResource(): ng.resource.IResourceClass<IProductResource> {
			return this.$resource("/api/products/:productId");
		}
	}

	angular.module("common.services").service("dataAccessService", DataAccessService);
}