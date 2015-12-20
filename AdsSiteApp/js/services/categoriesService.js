app.factory('categoriesService', ['$http', 'baseServiceUrl', function ($http, baseServiceUrl) {
    function getHeaders(sessionToken){
        var headers = {
            'X-Parse-Application-Id':'QZdASJwiIdRG8gytBbA8XrtZD9cAcyJZzvCNsA2y',
            'X-Parse-REST-API-Key':'rWXo5EqxtqQETDbgX0roOKcYxeDuGAQACn4gfHAV',
            'Content-Type':'application/json'
        };
        if(sessionToken){
            headers['X-Parse-Session-Token'] = sessionStorage['sessionToken'];
        }
        return headers;
    }

    function getCategories(){
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'classes/Categories?order=categoryName',
            headers: getHeaders(true)
        };
        return $http(request);
    }

    function createCategory(category, success){
        var request = {
            method: 'POST',
            url: baseServiceUrl + 'classes/Categories',
            headers: getHeaders(true),
            data: category

        };
        request.data['ACL']['e5uR7wquWK'] = {"read":true,"write":true}; //Actually it has to be with 'request.data['ACL']['administrator']', but there is some problem about roles
        request.data['ACL']['*'] = {"read":true};

        return $http(request).success(success)
    }

    function updateCategory(category, success){
        var request = {
            method: 'PUT',
            url: baseServiceUrl + 'classes/Categories/' + category.objectId,
            headers: getHeaders(true),
            data: category
        };

        return $http(request).success(success);
    }

    function getCategoryById(categoryId){
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'Categories/' + categoryId,
            headers: getHeaders(true)
        };
        return $http(request);
    }

    function deleteCategory(category, success){
        var request = {
            method: 'DELETE',
            url: baseServiceUrl + 'classes/Categories/' + category.objectId,
            headers: getHeaders(true)
        };
        return $http(request).success(success);
    }


    return {
        getCategories: getCategories,
        createCategory: createCategory,
        updateCategory: updateCategory,
        deleteCategory: deleteCategory,
        getCategoryById: getCategoryById
    }
}]);