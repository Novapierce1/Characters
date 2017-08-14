var app = angular.module("FFTactics", ['ngRoute'])

app.config(function($routeProvider){
    $routeProvider
    .when("/home", {
        templateUrl: "../views/home.html"
    })
    .when("/list", {
        templateUrl: "../views/list.html"
    })
    .when("/one/:id", {
        templateUrl: "../views/single.html"
    })
    .when("/type/:type", {
        templateUrl: "../views/type.html"
    })
});

app.controller('listController',  function($http, $scope, $location){
    $http.get('http://localhost:3000/list')
       .then(function(success){
        $scope.data=success.data
    },  function(err){
        alert('something went wrong')
    })
    $scope.getId=function(id){
        $location.path('/one/' + id)
    }
});

app.controller('singleController',  function($http, $scope, $routeParams){
        var id = $routeParams.id
    $http.get('http://localhost:3000/one/' + id)
       .then(function(success){
        $scope.single=success.data
    })
});

app.controller('typeController',  function($http, $scope, $location, $routeParams){
    var type = $routeParams.type
    $http.get('http://localhost:3000/type/'+type)
       .then(function(success){
        $scope.type = success.data
    },  function(err){
        alert('something went wrong')
    })
    $scope.getId=function(id){
        $location.path('/one/' + id)
    }
});