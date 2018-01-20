(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',ListItem)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function ListItem(){
	var ddo = {
			scope : {
				found : '<',
				onRemove : '&',
				nothing : '<'
			},
			templateUrl : 'listItem.html',
			bindToController: true,
			controller: NarrowItDownController,
			controllerAs: 'nid'
	};

	return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var nid = this;
	nid.name = "";
	nid.nothing = false;

	nid.getMatchedMenuItems = function(){
			if ((nid.name == undefined) || (nid.name=="") ){
				nid.nothing = true;
			}else{
				nid.nothing = false;
				var prom = MenuSearchService.getMatchedMenuItems(nid.name);
				prom.then(function (odp){
					nid.found = odp;
					if (nid.found.length == 0){
						nid.nothing = true;
					}
				}).catch(function(error){
						console.log("Error");
				});
			}
	}

	nid.removeItem = function(index){
		nid.found.splice(index,1);
	}
}


MenuSearchService.$inject = ['$http','ApiBasePath']

function MenuSearchService($http, ApiBasePath){
	var search = this;

 	search.getMatchedMenuItems = function(searchTerm) {
		var response = $http({
 			method: "GET",
		    url: (ApiBasePath+"/menu_items.json")
	 }).then(function (result){
		 var foundItems = [];
		 var odp = result.data;
 	 	 for (var property in odp) {
	 		 if (odp.hasOwnProperty(property)) {
	 					for (var i = 0; i < odp[property].length; i++) {
 							var w = odp[property][i].name.toLowerCase();
 							if (w.includes(searchTerm.toLowerCase())){
 							  	foundItems.push(w);
 					    }
	 				 }
	 		 }
 		 }
		 return foundItems;
	 }).catch(function(error){
		 	 console.log("Data error");
	 });
	 return response;
 }

}



})();