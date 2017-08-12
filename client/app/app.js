var app = angular.module('FFTactics', ['ngRoute'])

app.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "../views/home.html",
    })
    .when("/list", {
        templateUrl: "../views/list.html",
    })
    .when("/single/:id", {
        templateUrl: "../views/single.html",
    })
    .when("/classes", {
        templateUrl: "../views/classes.html",
    })
});

app.controller('listController',  function($http, $scope, $location){
    $http.get('http://localhost:3000/api/list')
       .then(function(success){
        $scope.data=success.data
    },  function(err){
        alert('something went wrong')
    })
    $scope.getId=function(id){
        $location.path('/single/' + id)
    }
});

app.controller('singleController',  function($http, $scope, $location){
    $http.get('http://localhost:3000/api/one/:id')
       .then(function(success){
        $scope.data=success.data
    },  function(err){
        alert('something went wrong')
    })
});

app.controller('classController',  function($http, $scope, $location){
    $http.get('http://localhost:3000/api/classes/' + type)
       .then(function(success){
        $scope.data=success.data
    },  function(err){
        alert('something went wrong')
    })
    $scope.getId=function(id){
        $location.path('/one/' + id)
    }
});