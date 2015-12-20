app.factory('townsService', ['$http', 'baseServiceUrl', function ($http, baseServiceUrl) {
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

    function getTowns(){
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'classes/Towns?order=townName',
            headers: getHeaders()
        };
        return $http(request);
    }

    function createTown(town, success){
        var request = {
            method: 'POST',
            url: baseServiceUrl + 'classes/Towns',
            headers: getHeaders(true),
            data: town

        };
        request.data['ACL']['e5uR7wquWK'] = {"read":true,"write":true};
        request.data['ACL']['*'] = {"read":true};

        return $http(request).success(success)
    }

    function updateTown(town, success){
        var request = {
            method: 'PUT',
            url: baseServiceUrl + 'classes/Towns/' + town.objectId,
            headers: getHeaders(true),
            data: town
        };

        return $http(request).success(success);
    }

    function getTownById(townId){
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'Towns/' + townId,
            headers: getHeaders(true)
        };
        return $http(request);
    }

    function deleteTown(town, success){
        var request = {
            method: 'DELETE',
            url: baseServiceUrl + 'classes/Towns/' + town.objectId,
            headers: getHeaders(true)
        };
        return $http(request).success(success);
    }

    return {
        getTowns: getTowns,
        createTown: createTown,
        updateTown: updateTown,
        getTownById: getTownById,
        deleteTown:deleteTown
    }
}]);
