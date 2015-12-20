app.directive('towns', function () {
    return {
        controller: 'HomeCtrl',
        templateUrl: 'templates/towns.html',
        restrict: 'E',
        replace: true
    }
});