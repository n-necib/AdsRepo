app.controller('RegisterCtrl',['$scope', 'userService','townsService', 'notifyService',
    function ($scope, userService, townsService, notifyService) {

    $scope.user = {ACL:{}};
    $scope.townId = null;

    townsService.getTowns()
        .success(function (data) {
            $scope.towns = data
        });


    $scope.register = function (user, townId) {
        var confirmPass = $( "#confirmPass" ).val();
        if(user.username&&user.password&&user.phone&&user.email&&townId&&user.name&&confirmPass){
            if($( "#inputPassword" ).val() == confirmPass){
                userService.register(user, townId)
                    .success(function () {
                        userService.logout();
                        notifyService.successMsg('Registration is successful! Please, Login.');
                    })
                    .error(function (err) {
                        notifyService.errorMsg('Registration failed!', err.error)
                    })
            }else{
                notifyService.errorMsg('Registration failed!', 'Confirmation of password does not match!')
            }

        }else{
            notifyService.errorMsg('Registration failed!', 'Please, fill the all fields!')
        }
    };

}]);