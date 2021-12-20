angular.module("myApp")
    .controller("HomeCtrl", ['commonService', '$scope', '$timeout', '$window', '$filter', 'MasterMenu', '$http', function (commonService, $scope, $timeout, $window, $filter, MasterMenu, $http) {
        MasterMenu.getMenuData("Fisrt")
            .then(function (response) {
                console.log(response.data);
            });
        $scope.testb = "I am fine";
    }]);