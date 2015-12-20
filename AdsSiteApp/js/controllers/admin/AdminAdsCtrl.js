app.controller('AdminAdsCtrl',['$scope', 'adminService', 'adsService', function ($scope, adminService, adsService) {

    $scope.currentPage = 1;
    $scope.pageSize = 5;
    var adminId = sessionStorage['userId'];

    adsService.getUserAds(adminId)
        .success(function (data) {
            if(data.results.length >= 1){
                $scope.adminAds = data
            }else{
                var result = $("<p></p>").text("No Results.");
                $("div#adminAds").append(result);
            }

        });

    $scope.deactivateAd = function (ad) {
        adsService.deactivateAd(ad.objectId, function success(data) {
            ad.status = 'Inactive';
        })
    };


    $scope.deleteAd = function(ad){
        adsService.deleteAd(ad, function () {
            ad.title = null;
        })

    };

    $scope.publishAdminAdAgain = function (ad) {
        adminService.publishAgain(ad, function () {
            ad.status = 'Approved';
        })
    }
}]);
