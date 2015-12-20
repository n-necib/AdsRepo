app.controller('HomeCtrl',['$scope', 'adsService', 'categoriesService', 'townsService', 'userService','adminService',
    function ($scope, adsService, categoriesService, townsService, userService, adminService) {


        $scope.currentPage = 1;
        $scope.pageSize = 5;
        $scope.filterParams = {
            catSelect: null,
            twnSelect: null
        };


        $scope.username = sessionStorage["username"];

        $scope.getAds = function () {
            //$scope.filterParams.catSelect = undefined;
            //$scope.filterParams.twnSelect = undefined;
            delete $scope.ads;
            //$('input[name=categorySelect]').attr('checked',false);
            //$('input[name=townSelect]').attr('checked',false);
            adsService.getAllAds()
                .success(function (data) {
                    $scope.ads = data;
                });
        };

        $scope.getAds();

        categoriesService.getCategories()
            .success(function (data) {
                $scope.categories = data
            });

        townsService.getTowns()
            .success(function (data) {
                $scope.towns = data
            });

        $scope.isAdmin = function () {
            if(sessionStorage['role']){
                return true;
            }

        };

        $scope.isUser = function () {
            if(!sessionStorage['role']&&sessionStorage['sessionToken']){
                return true;
            }
        };

        $scope.isGuest = function () {
            if(!sessionStorage['role']&&!sessionStorage['sessionToken']){
                return true;
            }
        };

        $scope.getFilteredAds = function (filterParams) {
            delete $scope.ads;
            adsService.getAllAds(filterParams)
                .success(function (data) {
                    $scope.ads = data;
                })
                .success(function () {
                    $scope.filterParams.catSelect = undefined;
                    $scope.filterParams.twnSelect = undefined;
                })

        };

        $scope.logout = function () {
            userService.logout()
        };



}]);