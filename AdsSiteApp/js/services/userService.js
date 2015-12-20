app.factory('userService',['$http', 'baseServiceUrl', function ($http, baseServiceUrl) {
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

    function setSessionStorage(data){
        sessionStorage["sessionToken"] = data["sessionToken"];
        sessionStorage["userId"] = data["objectId"];
        sessionStorage["username"] = data["username"];

        return sessionStorage["sessionToken"];


    }

    function register(user, townId){
        var request = {
            method: 'POST',
            url: baseServiceUrl + 'users',
            headers:getHeaders(),
            data: user

        };
        request.data.townId = {"__type": "Pointer", "className": "Towns", "objectId": townId};
        request.data['ACL']['*'] = {"read":true};

        return $http(request).success(function (data) {
            sessionStorage["sessionToken"] = data["sessionToken"];
        });
    }

    function login(user){
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'login?username=' + user.username + '&password=' + user.password,
            headers: getHeaders()
        };
        return $http(request).success(function (data) {
            setSessionStorage(data);
            getRole(data.objectId)
        })
    }

    function  getRole(userId){
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'roles?where={"users":"' + userId + '"}}',
            headers: getHeaders()
        };
        return $http(request).success(function (data) {
            if(data.results&&data.results[0]&&data.results[0].name){
                sessionStorage['role'] = data.results[0].name;
            }
        })

    }

    function getUser(userId){
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'users/' + userId + '?include=userId,townId',
            headers: getHeaders(true)
        };
        return $http(request);
    }


    function editUser(user, townId){
        var request = {
            method: 'PUT',
            url: baseServiceUrl + 'users/' + user.objectId,
            headers: getHeaders(true),
            data: user
        };
        request.data['townId'] = {"__type": "Pointer", "className": "Towns", "objectId": townId};

        return $http(request);
    }


    function logout(){
        var request = {
            method: 'POST',
            url: baseServiceUrl + 'logout',
            headers: getHeaders(true)
        };
        if(sessionStorage['role']){
            delete sessionStorage['role'];
        }
        delete sessionStorage['userId'];
        delete sessionStorage['sessionToken'];
        delete sessionStorage['username'];
        if(sessionStorage['role']){
            delete sessionStorage['role'];
        }
        return $http(request).success(function () {
                      window.location.replace('#/')
                  })
    }
    function isUser() {
        if(!sessionStorage['role']&&sessionStorage['sessionToken']){
            return true;
        }
    }

    function resetPassword(email){
        var request = {
            method: 'POST',
            url: baseServiceUrl + 'requestPasswordReset',
            headers: getHeaders(true),
            data: {email:null}
        };
        request.data['email'] = email;

        return $http(request);
    }
    return {
        register: register,
        login: login,
        getUser: getUser,
        editUser: editUser,
        logout: logout,
        isUser: isUser,
        resetPassword: resetPassword
    }
}]);
