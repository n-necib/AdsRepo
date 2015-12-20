'use strict';

var app = angular.module('adsSiteApp',['ngRoute', 'ui.bootstrap.pagination']);
app.constant('baseServiceUrl', 'https://api.parse.com/1/');

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/',{
        controller: 'HomeCtrl',
        templateUrl: 'templates/home.html'
    });

    $routeProvider.when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'templates/user/login.html'
    });

    $routeProvider.when('/register', {
        controller: 'RegisterCtrl',
        templateUrl: 'templates/user/register.html'
    });

    $routeProvider.when('/user/ads', {
        controller: 'UserAdsCtrl',
        templateUrl: 'templates/user/user-ads.html'
    });

    $routeProvider.when('/user/ads/publish', {
        controller: 'PublishAdCtrl',
        templateUrl: 'templates/user/publish-ad.html'
    });

    $routeProvider.when('/user/editProfile', {
        controller: 'EditUserCtrl',
        templateUrl: 'templates/user/edit-profile.html'
    });

    $routeProvider.when('/user/ads/editAd/:id', {
        controller: 'EditAdCtrl',
        templateUrl: 'templates/user/edit-ad.html'
    });

    $routeProvider.when('/admin/ads', {
        controller: 'AdminAdsCtrl',
        templateUrl: 'templates/admin/admin-ads.html'
    });

    $routeProvider.when('/admin/ads/publish', {
        controller: 'AdminPublishAdCtrl',
        templateUrl: 'templates/admin/admin-publish-ad.html'
    });

    $routeProvider.when('/admin/editProfile', {
        controller: 'AdminProfileCtrl',
        templateUrl: 'templates/admin/admin-edit-profile.html'
    });

    $routeProvider.when('/admin/view-ads', {
        controller: 'AdsCtrl',
        templateUrl: 'templates/admin/view-ads.html'
    });

    $routeProvider.when('/admin/categories', {
        controller: 'CategoriesCtrl',
        templateUrl: 'templates/admin/details-categories.html'
    });

    $routeProvider.when('/admin/towns', {
        controller: 'TownsCtrl',
        templateUrl: 'templates/admin/details-towns.html'
    });

    $routeProvider.when('/admin/ads/editAd/:id', {
        controller: 'AdminEditAdCtrl',
        templateUrl: 'templates/admin/admin-edit-ad.html'
    });
    //$routeProvider.when('/users', {
    //    controller: 'UsersCtrl',
    //    templateUrl: 'templates/admin/users.html'
    //});

    $routeProvider.otherwise(
        { redirectTo: '/' }
    );
}]).filter('pagination', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        return input.slice(start);
    }
});

app.run(function ($rootScope, $location) {
    $rootScope.$on('$locationChangeStart', function () {
        if ($location.path().indexOf("/user/") != -1 && !sessionStorage['sessionToken']) {
            $location.path("/");
        }

        if ($location.path().indexOf("/admin/") != -1 && !sessionStorage['role']) {
            $location.path("/");
        }

    });
});

