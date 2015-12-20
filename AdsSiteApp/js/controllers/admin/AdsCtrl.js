app.controller('AdsCtrl',['$scope', 'adminService' ,'adsService', 'notifyService',
    function ($scope, adminService, adsService, notifyService) {
        $scope.currentPage = 1;
        $scope.pageSize = 4;
        $scope.statusParam = null;

        adminService.getUsersAds()
            .success(function (data) {
                $scope.usersAds = data;
            });

        $scope.getFilteredStatusAds = function (status) {
            if(status){
                delete $scope.usersAds;
                adminService.getFilteredStatusAds(status)
                    .success(function (data) {
                        $scope.usersAds = data;
                    })
            }else{
                notifyService.errorMsg('Please, check the button','');
            }


        };

        $scope.resetAds = function () {
            delete $scope.usersAds;
            adminService.getUsersAds()
                .success(function (data) {
                    $scope.usersAds = data;
                })
                .success(function () {
                    $scope.statusParam = undefined;
                })
        };

        $scope.waitingApproval = function (ad) {
            adminService.waitingApproval(ad, function success() {
                ad.status = 'Waiting Approval';
            })
        };

        $scope.approve = function (ad) {
            adminService.approve(ad, function success() {
                ad.status = 'Approved';
            })
        };

        $scope.deleteAd = function (ad) {
            adsService.deleteAd(ad, function () {
                ad.title = null;
            })
        }
    }]);



