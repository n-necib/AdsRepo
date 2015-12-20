app.controller('AdminEditAdCtrl',['$scope', 'adminService', 'adsService', 'categoriesService', 'townsService', 'notifyService',
    function ($scope, adminService, adsService, categoriesService, townsService, notifyService) {

        var url = (window.location).href;
        var id = url.substring(url.lastIndexOf('/') + 1);

        $scope.townId = null;
        $scope.categoryId = null;

        townsService.getTowns()
            .success(function (data) {
                $scope.towns = data;
            });
        categoriesService.getCategories()
            .success(function (data) {
                $scope.categories = data;
            });

        adsService.getAdById(id)
            .success(function (data) {
                $scope.ad = data;
            });

        $scope.updateAdminAd = function (ad, townId, categoryId) {
            if(ad.title&&ad.text&&ad.price&&townId&&categoryId){
                adminService.updateAdminAd(ad, townId, categoryId)
                    .success(function () {
                        notifyService.successMsg('The ad was updated successfully');
                        window.location.replace('#/');
                    })
                    .error(function (err) {
                        notifyService.errorMsg('Tha ad was not updated!', err.error)
                    })
            }else{
                notifyService.errorMsg('Tha ad was not updated!', 'Please, fill the all fields')
            }

        };



    }]);
