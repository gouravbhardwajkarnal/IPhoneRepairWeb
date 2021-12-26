angular.module('MyApp', [])
    .controller('MyCntrl', function ($scope, $window) {
        $window.location.href = 'https://localhost:44311/UserPanel/HomeRepair.html';
    });