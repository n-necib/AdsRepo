app.factory('notifyService', function () {

    function successMsg(msg){
        noty({
            text: msg,
            type: 'success',
            layout: 'topCenter',
            timeout: 1000
        })
    }

    function errorMsg(msg, error){
        noty({
            text: msg + '<br>' + error,
            type: 'error',
            layout: 'topCenter',
            timeout: 5000
        })
    }

    return{
        successMsg: successMsg,
        errorMsg: errorMsg
    }

});
