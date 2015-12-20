app.controller('UsersCtrl',['$scope', 'adminService', 'notifyService', function ($scope, adminService, notifyService) {

    $scope.currentPage = 1;
    $scope.pageSize = 5;

    adminService.getUsers()
        .success(function (data) {
            $scope.users = data;
        });

    var userString = $('#inputUserString').val();
    $scope.getFilteredUsers = function () {
        delete $scope.users;
        adminService.getFilteredUsers(userString)
        .success(function (data) {
            $scope.users = data;
        })
    };

    $scope.deleteUser = function (user) {
        adminService.deleteUser(user, function () {
            user.username = null;
        })
    };

    $scope.resetUsers = function () {
        delete $scope.users;
        adminService.getUsers()
            .success(function (data) {
                $scope.users = data;
            });
    }
}]);