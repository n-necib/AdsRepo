app.controller('UserAdsCtrl',['$scope', 'adsService', 'notifyService', function ($scope, adsService, notifyService) {
    var userId = sessionStorage['userId'];
    $scope.currentPage = 1;
    $scope.pageSize = 5;

    adsService.getUserAds(userId)
        .success(function (data) {
            if(data.results.length >= 1){
                $scope.userAds = data
            }else{
                var result = $("<p></p>").text("No Results.");
                $("div#userAds").append(result);
            }

        });

    $scope.deactivateAd = function (ad) {
        adsService.deactivateAd(ad.objectId, function success(data) {
            ad.status = 'Inactive';
        })
    };

    $scope.publishAgainUserAd = function (ad) {
        adsService.publishAgain(ad.objectId, function success(data) {
            ad.status = 'Waiting Approval';
        })
    };

    $scope.deleteAd = function(ad){
        adsService.deleteAd(ad, function () {
            ad.title = null;
        })

    }
}]);
