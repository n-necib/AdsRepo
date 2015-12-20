app.controller('TownsCtrl',['$scope', 'townsService', 'notifyService', function ($scope, townsService, notifyService) {
    $scope.twn = {ACL:{}};
    townsService.getTowns()
        .success(function (data) {
            $scope.towns = data;
        });

    $scope.deleteTown = function (town) {
        townsService.deleteTown(town, function () {
            town.townName = null;
        })

    };


    $scope.addTown = function (town) {
        townsService.createTown(town, function () {
            delete  $scope.towns;
            townsService.getTowns()
                .success(function (data) {
                    $scope.towns = data;
                });
        })

    };

    $scope.editTown = function (town) {
        townsService.updateTown(town, function (data) {
            notifyService.successMsg('The town was edited successfully');
            town.townName = data.townName
        })


    };
}]);