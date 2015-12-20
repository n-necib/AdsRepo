app.factory('adminService',['$http', 'baseServiceUrl', function ($http, baseServiceUrl) {
    function getHeaders(sessionToken){
        var headers = {
            'X-Parse-Application-Id':'QZdASJwiIdRG8gytBbA8XrtZD9cAcyJZzvCNsA2y',
            'X-Parse-REST-API-Key':'rWXo5EqxtqQETDbgX0roOKcYxeDuGAQACn4gfHAV',
            'X-Parse-Revocable-Session': '1',
            'Content-Type':'application/json'

        };
        if(sessionToken){
            headers['X-Parse-Session-Token'] = sessionStorage['sessionToken'];
        }
        return headers;
    }

    function getAdminHeaders(){
        var headers = {
            'X-Parse-Application-Id':'QZdASJwiIdRG8gytBbA8XrtZD9cAcyJZzvCNsA2y',
            'X-Parse-Master-Key':'5ft9jCKLCPdScS2dXqb0RwAwr35bmVOgSboNzalU',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE',
            'Access-Control-Allow-Headers': 'X-Custom-Header',
            //'X-Parse-Session-Token': sessionStorage['sessionToken'],
            //'X-Parse-Revocable-Session': '1',
            'Content-Type':'application/json'
        };

        return headers;
    }

    function getUsersAds(){
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'classes/Ads/?include=userId,categoryId,townId&' +
            'where={"status":{"$ne":"Inactive"}}',
            headers: getHeaders(true)
        };
        return $http(request);

    }

    function createAdminAd(ad, townId, categoryId, adminId){
        var request = {
            method: 'POST',
            url: baseServiceUrl + 'classes/Ads',
            headers: getHeaders(true),
            data: ad

        };
        request.data['status'] = 'Approved';
        request.data['townId'] = {"__type": "Pointer", "className": "Towns", "objectId": townId};
        request.data['categoryId'] = {"__type": "Pointer", "className": "Categories", "objectId": categoryId};
        request.data['userId'] = {"__type": "Pointer", "className": "_User", "objectId": adminId};
        request.data['ACL']['e5uR7wquWK'] = {"read":true,"write":true};
        request.data['ACL']['*'] = {"read":true};

        return $http(request);
    }

    function approve(ad, success) {
        var request = {
            method: 'PUT',
            url: baseServiceUrl + 'classes/Ads/' + ad.objectId,
            headers: getHeaders(true),
            data: JSON.stringify({
                status: 'Approved'
            })
        };
        return $http(request).success(success);
    }

    function waitingApproval(ad, success) {
        var request = {
            method: 'PUT',
            url: baseServiceUrl + 'classes/Ads/' + ad.objectId,
            headers: getHeaders(true),
            data: JSON.stringify({
                status: 'Waiting Approval'
            })
        };
        return $http(request).success(success);
    }

    function getUsers(){
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'users?include=townId',
            headers: getHeaders()
        };
        return $http(request);
    }

    function deleteUser(user, success){
        var request = {
            method: 'DELETE',
            url: baseServiceUrl + 'users/' + user.objectId,
            headers: getAdminHeaders()
        };
        return $http(request).success(success);
    }

    function getUserById(userId){
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'users/' + userId + '?include=townId',
            headers: getHeaders(true)
        };
        return $http(request);
    }

    function getFilteredUsers(userString){
        var request = {
            method: 'GET',
            url: baseServiceUrl + '?include=townId&where={"username":{"$regex":"^' + userString + '"}}',
            headers: getAdminHeaders()
        };
        return $http(request);
    }

    function getFilteredStatusAds(status){
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'classes/Ads?include=userId,townId&where={"status":"' + status + '"}',
            headers: getHeaders()
        };
        return $http(request);
    }

    function publishAgain(ad, success){
        var request = {
            method: 'PUT',
            url: baseServiceUrl + 'classes/Ads/' + ad.objectId,
            headers: getHeaders(true),
            data: JSON.stringify({
                status: 'Approved'
            })
        };
        return $http(request).success(success);
    }

    function updateAdminAd(ad, townId, categoryId){

        var request = {
            method: 'PUT',
            url: baseServiceUrl + 'classes/Ads/' + ad.objectId,
            headers: getHeaders(true),
            data: ad
        };
        request.data['townId'] = {"__type": "Pointer", "className": "Towns", "objectId": townId};
        request.data['categoryId'] = {"__type": "Pointer", "className": "Categories", "objectId": categoryId};
        request.data['status'] = 'Approved';

        return $http(request);
    }

    return {
        getUsersAds: getUsersAds,
        createAdminAd: createAdminAd,
        approve: approve,
        waitingApproval: waitingApproval,
        deleteUser: deleteUser,
        getUsers: getUsers,
        getUserById: getUserById,
        getFilteredUsers: getFilteredUsers,
        getFilteredStatusAds: getFilteredStatusAds,
        publishAgain: publishAgain,
        updateAdminAd: updateAdminAd
    }
}]);
