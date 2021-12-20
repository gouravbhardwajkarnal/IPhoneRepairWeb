mod.controller("UserCntrl", ['commonService', '$scope', '$timeout', '$window', '$filter', '$http', function (commonService, $scope, $timeout, $window, $filter,  $http) {
        $scope.testb = "I am fine";

        $scope.GetAllMenu = function () {
            commonService.get(ApiDomain + "/api/Admin/GetALL", {}).then(function (response) {
                data = response.data;
                if (data != '') {
                    $scope.MenuList = data;
                    $scope.GetSubMenuAll();
                }
            })
        }
        $scope.GetAllMenu();

        $scope.GetSubMenuAll = function () {
            commonService.get(ApiDomain + "/api/Admin/GetALLSubMenu", {}).then(function (response) {
                data = response.data;
                if (data != '') {
                    $scope.SubMenuList = data;
                }
            })
        }

        $scope.GetIPoneMenu = function () {
            commonService.get(ApiDomain + "/api/Admin/GetALLCreateIPad", {}).then(function (response) {
                data = response.data;
                if (data != '') {
                    $scope.IPadMenuList = data;
                    $scope.GetIPoneSubMenuAll();
                }

            })
        }
        $scope.GetIPoneMenu();
        $scope.IPMenuList = [];
        $scope.GetIPoneSubMenuAll = function () {
            commonService.get(ApiDomain + "/api/Admin/GetALLIPadSubMenu", {}).then(function (response) {
                data = response.data;
                if (data != '') {
                    $scope.IPadSubMenuList = data;
                    for (var i = 0; i < $scope.IPadMenuList.length; i++) {
                        for (var k = 0; k < $scope.IPadMenuList.length; k++) {
                            if ($scope.IPadMenuList[i].menuName == $scope.IPadSubMenuList[k].menuName) {
                                $scope.IPMenuList.push($scope.IPadSubMenuList[k]);
                            };
                        }
                    };
                }
            })
        }



        $scope.criteriaMatch = function (criteria) {

            for (var i = 0; i < $scope.IPadSubMenuList.length; i++) {
                if ($scope.IPadSubMenuList[i].menuName == criteria.menuName) {
                    $scope.IPadSubMenuList[i];
                };
            };
        };


    }]);