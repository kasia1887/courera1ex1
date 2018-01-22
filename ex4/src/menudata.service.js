(function () {
'use strict';

	angular.module('data')
	.service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

	MenuDataService.$inject = ['$http','ApiBasePath'];
	function MenuDataService ($http,ApiBasePath) {
		
		var ctrl = this;
		var categories = [];
		var items = [];

		ctrl.getAllCategories = function() {
			
			return $http ({
				method: 'GET',
				url: ApiBasePath + '/categories.json'
				})
			.then(function (result) {
				return result.data;
			})
			.catch(function (error) {
				console.log("Error1:",error);
				return error;
			});

		};


		ctrl.getItemsForCategory = function (shortName) {
			
			return $http ({
				method: 'GET',
				url: ApiBasePath +'/menu_items.json',
				params: {
					category : shortName
				}
				})
				.then(function (result) {
				return result.data;
			})
			.catch(function (error) {
				console.log("Error2:",error);
				return error;
			});
		};
	}

})();