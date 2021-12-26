mod.controller("MyCntrl", ['commonService', '$scope', '$timeout', '$window', '$filter', '$http', function (commonService, $scope, $timeout, $window, $filter, $http) {
 
        $scope.GetAllQuery = function () {
            commonService.get(ApiDomain + "/api/Contact/GetALL", {}).then(function (response) {
                data = response.data;
                if (data != '') {
                    $scope.QueryList = data;
                }

            })
        }
    $scope.GetAllQuery();

    }]);