angular.module('myapp').controller('RightPanelCtrl', function ($scope) {
    
    $scope.$on('onElementSelected',function(event,selected){
        $scope.display = selected;
    });
});
