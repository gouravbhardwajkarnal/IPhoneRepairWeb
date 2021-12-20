angular.module("myApp")
    .controller("IPhoneMenuCtrl", ['commonService', '$scope', '$timeout', '$window', '$filter', 'MasterMenu', '$http', function (commonService, $scope, $timeout, $window, $filter, MasterMenu, $http) {
        MasterMenu.getMenuData("Fisrt")
            .then(function (response) {
                console.log(response.data);
            });

        $scope.SaveClick = function () {

            var dataobject = {
                MenuName: $scope.MenuName,
                MenuUrl: $scope.Url,

            }
            Data = JSON.stringify(dataobject);
            commonService.post("https://localhost:44360/api/Admin/CreateIPad", Data).then(function (response) {
                data = response.data;
                if (data == 0) {
                    $scope.MenuName = "";
                    $scope.Url = "";
                    $scope.GetAllMenu();
                    alert("Addd SucessFully");
                }

            })
        }
        $scope.GetAllMenu = function () {
            commonService.get("https://localhost:44360/api/Admin/GetALLCreateIPad", {}).then(function (response) {
                data = response.data;
                if (data != '') {
                    $scope.MenuList = data;
                }

            })
        }
        $scope.GetAllMenu();

        $scope.EditMenu = function (index, Autoid) {
            $scope.MenuName = $scope.MenuList[index].menuName;
            $scope.Url = $scope.MenuList[index].menuUrl;
            $scope.Autoid = Autoid;
            $scope.BtnUpdate = true;
            $scope.BtnSave = true;
        }


        $scope.UpdateClick = function () {

            var dataobject = {
                AutoId: $scope.Autoid,
                MenuName: $scope.MenuName,
                MenuUrl: $scope.Url,

            }
            Data = JSON.stringify(dataobject);
            commonService.post("https://localhost:44360/api/Admin/UpdateIPadMenu", Data).then(function (response) {
                data = response.data;
                if (data == 0) {
                    $scope.MenuName = "";
                    $scope.Url = "";
                    $scope.BtnUpdate = false;
                    $scope.BtnSave = false;
                    $scope.GetAllMenu();
                    alert("Updated SucessFully");
                }

            })
        }

        $scope.DeleteMenu = function (index, Autoid) {
            if (confirm("Are you sure want to delete ?")) {
                commonService.post("https://localhost:44360/api/Admin/DeleteIPadMenu?Id=" + Autoid + "", {}).then(function (response) {
                    data = response.data;
                    if (data == 'Deleted') {
                        $scope.MenuName = "";
                        $scope.Url = "";
                        $scope.BtnUpdate = false;
                        $scope.BtnSave = false;
                        $scope.GetAllMenu();
                        alert("Deleted SucessFully");
                    }
                });
            }
        }

    }]);