app.controller('EditAdCtrl',['$scope', 'adsService', 'categoriesService', 'townsService', 'notifyService',
    function ($scope, adsService, categoriesService, townsService, notifyService) {

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

        $scope.updateAd = function (ad, townId, categoryId) {
            if(ad.title&&ad.text&&ad.price&&townId&&categoryId){
                adsService.updateAd(ad, townId, categoryId)
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

        var handleFileSelect = function  () {
            var file = document.querySelector('input[type=file]').files[0];
            var reader = new FileReader();
            reader.onload = function () {
                $scope.ad.image = reader.result;
                $(".image-edit").html("<img src='" + reader.result + "'>");

            };
            reader.readAsDataURL(file);

        };

        document.getElementById('editImage').addEventListener('change', handleFileSelect, false);


    }]);
