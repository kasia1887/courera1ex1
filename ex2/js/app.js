(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  
  var buyController = this;

  buyController.list = ShoppingListCheckOffService.getItems1();
    
  buyController.buy = function (itemIndex) {
        console.log("a");
        ShoppingListCheckOffService.buy(itemIndex);
    }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtController = this;

  boughtController.list = ShoppingListCheckOffService.getItems2();  
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var tb = [];
  var ab = [];
  tb.push({name:"apple",quantity:1})
  tb.push({name:"orange",quantity:2})
  tb.push({name:"banana",quantity:4})
  tb.push({name:"lemon",quantity:3})
  tb.push({name:"pear",quantity:2})
  

  service.getItems1 = function () {
    return tb;
  };
  service.getItems2 = function () {
    return ab;
  };
  service.buy = function (itemIndex) {
      ab.push(tb[itemIndex]);
      tb.splice(itemIndex, 1)[0];  
      console.log(tb);
      console.log(ab);
    };
}

})();
