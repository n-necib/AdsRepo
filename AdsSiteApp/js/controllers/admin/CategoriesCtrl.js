app.controller('CategoriesCtrl',['$scope', 'categoriesService', 'notifyService', function ($scope, categoriesService, notifyService) {
    $scope.cat = {ACL:{}};
    categoriesService.getCategories()
        .success(function (data) {
            $scope.categories = data;
        });

    $scope.deleteCategory = function (category) {
        categoriesService.deleteCategory(category, function () {
                category.categoryName = null;
            })

    };


    $scope.addCategory = function (category) {
        categoriesService.createCategory(category, function () {
            delete  $scope.categories;
            categoriesService.getCategories()
                .success(function (data) {
                    $scope.categories = data;
                });
        })

    };

    $scope.editCategory = function (category) {
        categoriesService.updateCategory(category, function (data) {
            notifyService.successMsg('The category was edited successfully');
            category.categoryName = data.categoryName
        })

    };
}]);
