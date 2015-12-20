app.directive('categories', function () {
   return {
       controller: 'HomeCtrl',
       templateUrl: 'templates/categories.html',
       restrict: 'E',
       replace: true
   }
});
