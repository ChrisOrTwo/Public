angular.module('myapp').controller('myController', function($scope){
 
    $scope.name = "any name";    
    $scope.onClick = function(){     
        $scope.name = "";
    };
    
});