angular.module('myapp').controller('LeftPanelCtrl', function ($scope, $http, $rootScope) {
    
    $http.get("data.json").success(function(data){
        $scope.elements = data;    
        $scope.$emit('onLoad',data);
    });
    
    $scope.onSelect = function(selected){
        $rootScope.$broadcast('onElementSelected',selected);
    };
});
