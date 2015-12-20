app.directive('publicAds', function () {
   return {
       controller: 'HomeCtrl',
       restrict: 'E',
       templateUrl: 'templates/public-ads.html',
       replace: true
   }
});
