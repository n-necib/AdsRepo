app.factory('adsService',['$http', 'baseServiceUrl', function ($http, baseServiceUrl) {
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


    function getAllAds(filterParams) {
        var url = null;
        if (filterParams) {
            if (filterParams.twnSelect && filterParams.catSelect) {
                url = baseServiceUrl + 'classes/Ads?include=userId,townId&where=' +
                    '{"townId":{"__type":"Pointer","className":"Towns","objectId":"' + filterParams.twnSelect + '"},' +
                    '"categoryId":{"__type":"Pointer","className":"Categories","objectId":"' +
                    filterParams.catSelect + '"},"status":"Approved"}';
            } else if (filterParams.twnSelect) {
                url = baseServiceUrl + 'classes/Ads?include=userId,townId&where=' +
                    '{"townId":{"__type":"Pointer","className":"Towns","objectId":"' +
                    filterParams.twnSelect + '"},"status":"Approved"}';
            } else if (filterParams.catSelect) {
                url = baseServiceUrl + 'classes/Ads?include=userId,townId&where=' +
                    '{"categoryId":{"__type":"Pointer","className":"Categories","objectId":"'
                    + filterParams.catSelect + '"},"status":"Approved"}';
            }

        }
        else {
            url = baseServiceUrl + 'classes/Ads?include=userId,townId&where={"status":"Approved"}'
        }

        var request = {
            method: 'GET',
            url: url,
            headers: getHeaders()
        };
        return $http(request);
    }
    function getAdById(adId){
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'classes/Ads/' + adId + '?include=categoryId,townId',
            headers: getHeaders(true)
        };
        return $http(request);

    }

    function updateAd(ad, townId, categoryId){

        var request = {
            method: 'PUT',
            url: baseServiceUrl + 'classes/Ads/' + ad.objectId,
            headers: getHeaders(true),
            data: ad
        };
        request.data['townId'] = {"__type": "Pointer", "className": "Towns", "objectId": townId};
        request.data['categoryId'] = {"__type": "Pointer", "className": "Categories", "objectId": categoryId};
        request.data['status'] = 'Waiting Approval';

        return $http(request);
    }

    function createAd(ad, townId, categoryId, userId){
        var request = {
            method: 'POST',
            url: baseServiceUrl + 'classes/Ads',
            headers: getHeaders(true),
            data: ad

        };
        request.data['status'] = 'Waiting Approval';
        request.data['townId'] = {"__type": "Pointer", "className": "Towns", "objectId": townId};
        request.data['categoryId'] = {"__type": "Pointer", "className": "Categories", "objectId": categoryId};
        request.data['userId'] = {"__type": "Pointer", "className": "_User", "objectId": userId};

        request.data['ACL']['e5uR7wquWK'] = {"read":true,"write":true};
        request.data['ACL']['*'] = {"read":true};
        request.data['ACL'][userId] = {"read":true,"write":true};

        return $http(request);
    }

    function deleteAd(ad, success){
        var request = {
            method: 'DELETE',
            url: baseServiceUrl + 'classes/Ads/' + ad.objectId,
            headers: getHeaders(true)
        };
        return $http(request).success(success);
    }

    function deactivateAd(ad, success){
        var request = {
            method: 'PUT',
            url: baseServiceUrl + 'classes/Ads/' + ad,
            headers: getHeaders(true),
            data: JSON.stringify({
                status: 'Inactive'
            })
        };
        return $http(request).success(success);

    }

    function publishAgain(ad, success){
        var request = {
            method: 'PUT',
            url: baseServiceUrl + 'classes/Ads/' + ad,
            headers: getHeaders(true),
            data: JSON.stringify({
                status: 'Waiting Approval'
            })
        };
        return $http(request).success(success);
    }

    function getUserAds(userId){
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'classes/Ads/?where={"userId":{"__type":"Pointer","className":"_User","objectId":"'+
            userId +'"}}?include="userId,townId,categoryId"',
            headers: getHeaders(true)
        };
        return $http(request);

    }


    return {
        getAllAds: getAllAds,
        getAdById: getAdById,
        updateAd: updateAd,
        createAd: createAd,
        deleteAd: deleteAd,
        deactivateAd: deactivateAd,
        getUserAds: getUserAds,
        publishAgain: publishAgain

    }

}]);
