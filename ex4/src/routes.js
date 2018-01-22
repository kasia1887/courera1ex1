(function () {
'use strict';

	angular.module('MenuApp')
		.config(RoutesConfig);

		RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
		function RoutesConfig ($stateProvider, $urlRouterProvider) {

			$urlRouterProvider.otherwise('/home');

			$stateProvider

				.state('home', {
					url: '/home',
					templateUrl: 'src/templates/home.html'
				})
				.state('categories', {
					url: '/categories', 
					templateUrl: 'src/templates/categories.template.html',
					controller: 'CategoriesController as ctrl',
					resolve: {
						categoriesItems: ['MenuDataService', function(MenuDataService) {
							return MenuDataService.getAllCategories();
						}]
					}
				})
				.state('itemDetail', {
					url: '/items/{shortName}',
					templateUrl: 'src/templates/items.template.html',
					controller: 'itemsController as ctrl',
					resolve : {
						item : ['$stateParams', 'MenuDataService', 
							function ($stateParams, MenuDataService) {
								return MenuDataService.getItemsForCategory($stateParams.shortName);
							}
						]
					}
				});
		}
})();