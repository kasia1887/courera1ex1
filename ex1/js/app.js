(function () {
'use strict';

angular.module('LunchCheck', [])
    .controller('MyController', MyController);

    MyController.$inject = ['$scope', '$filter'];
function MyController($scope, $filter) {
  $scope.odp="";
  $scope.sprawdz= function()
   {
        console.log(typeof $scope.dane == 'undefined' )
      if ( typeof $scope.dane == 'undefined' )
      {$scope.odp="Please enter data first";
        }
      else
      { var napis= $scope.dane.split(","); 
        console.log(napis,napis.length);
        if (napis.length==1 && napis[0]=="" )
             $scope.odp="Please enter data first";
        else
            if (napis.length<=3)
                { $scope.odp="Enjoy!";
                }
              else
                 { $scope.odp="Too much!";
                 }
      }
  }
}

})();
