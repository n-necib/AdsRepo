app.controller('EditUserCtrl',['$scope', 'userService', 'categoriesService', 'townsService', 'notifyService',
    function ($scope, userService, categoriesService, townsService, notifyService) {

        $scope.user = {};
        $scope.townId = null;
        var userId = sessionStorage['userId'];

        townsService.getTowns()
            .success(function (data) {
                $scope.towns = data;
            });
        categoriesService.getCategories()
            .success(function (data) {
                $scope.categories = data;
            });

        userService.getUser(userId)
            .success(function (data) {
               $scope.user = data
            });

        $scope.editUser = function (user, townId) {
            if(user.username&&user.password&&user.phone&&user.email&&townId&&user.name){
                userService.editUser(user, townId)
                    .success(function () {
                        notifyService.successMsg('The profile was edited successfully!');
                        window.location.replace('#/');
                    })
                    .error(function (err) {
                    notifyService.errorMsg('The profile was not edited!', err.error)
                })
            }else{
                notifyService.errorMsg('The profile was not edited!', 'Please, fill the all fields!')
            }

        }

    }]);
