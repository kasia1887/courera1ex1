(function () {

	angular.module('MenuApp')
	.controller('itemsController', itemsController);

	itemsController.$inject = ['item'];
	function itemsController (item) {
		var ctrl = this;
		ctrl.items = item.menu_items;
	}
	
})();