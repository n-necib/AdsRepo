app.controller('LoginCtrl',['$scope', '$location', 'userService', 'notifyService', function ($scope, $location, userService, notifyService) {

    $scope.user = {};
    $scope.emailStatus = false;
    $scope.email = null;

    $scope.login = function (user) {
        userService.login(user)
            .success(function () {
                notifyService.successMsg('Login is successful!');
                $location.path("#/");
            })
            .error(function (err) {
                notifyService.errorMsg('Login failed!', err.error)
            })
    };

    $scope.showEmail = function () {
        $scope.emailStatus = true;
    };

    $scope.resetPassword = function (email) {
        userService.resetPassword(email)
            .success(function () {
                notifyService.successMsg('The password was sent. Check your email')
            })
            .error(function (err) {
                notifyService.errorMsg('The password was not sent', err.error)
            })
    }

}]);

