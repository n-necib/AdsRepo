app.controller('PublishAdCtrl',['$scope', 'adsService', 'categoriesService', 'townsService', 'notifyService',
    function ($scope, adsService, categoriesService, townsService, notifyService) {

        $scope.ad = {ACL: {}};
        $scope.townId = null;
        $scope.categoryId = null;
        $scope.image = null;

        townsService.getTowns()
            .success(function (data) {
                $scope.towns = data;
            });
        categoriesService.getCategories()
            .success(function (data) {
                $scope.categories = data;
            });


        $scope.createAd = function (ad, townId, categoryId) {
            var userId = sessionStorage["userId"];
            if(ad.title&&ad.text&&ad.price&&townId&&categoryId){
                adsService.createAd(ad, townId, categoryId, userId)
                    .success(function () {
                        notifyService.successMsg('The ad was created successfully');
                        window.location.replace('#/');
                    })
                    .error(function (err) {
                    notifyService.errorMsg('Tha ad was not created!', err.error)
                })

            }else{
                notifyService.errorMsg('Tha ad was not created!', 'Please, fill the all fields')
            }

        };

        var handleFileSelect = function  () {
            var file = document.querySelector('input[type=file]').files[0];
                var reader = new FileReader();
                reader.onload = function () {
                    $scope.ad.image = reader.result;
                    $(".image-box").html("<img src='" + reader.result + "'>");

                };
                reader.readAsDataURL(file);

        };

        document.getElementById('inputImage').addEventListener('change', handleFileSelect, false);


}]);
