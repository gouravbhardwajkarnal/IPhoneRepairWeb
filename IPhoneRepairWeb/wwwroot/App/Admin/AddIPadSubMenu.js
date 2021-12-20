angular.module("myApp")
    .controller("SubMenuCtrl", ['commonService', '$scope', '$timeout', '$window', '$filter', 'MasterMenu', '$http', function (commonService, $scope, $timeout, $window, $filter, MasterMenu, $http) {
        MasterMenu.getMenuData("Fisrt")
            .then(function (response) {
                console.log(response.data);
            });

        $scope.SaveClick = function () {
            var dataobject = {
                MenuName: $scope.MenuName,
                SubMenu: $scope.SubMenu,
                MenuUrl: $scope.Url,

            }
            Data = JSON.stringify(dataobject);
            commonService.post("https://localhost:44360/api/Admin/CreateIPadSubMenu", Data).then(function (response) {
                data = response.data;
                if (data == 0) {
                    $scope.MenuName = [0]["--Select--"];
                    $scope.SubMenu = "";
                    $scope.Url = "";
                    $scope.GetSubMenuAll();
                    alert("Addd SucessFully");
                }

            })
        }
        $scope.GetAllMenu = function () {
            commonService.get("https://localhost:44360/api/Admin/GetALLCreateIPad", {}).then(function (response) {
                data = response.data;
                if (data != '') {
                    $scope.MenuList = data;
                    $scope.GetSubMenuAll();
                }

            })
        }
        $scope.GetAllMenu();

        $scope.GetSubMenuAll = function () {
            commonService.get("https://localhost:44360/api/Admin/GetALLIPadSubMenu", {}).then(function (response) {
                data = response.data;
                if (data != '') {
                    $scope.SubMenuList = data;
                }
            })
        }


        $scope.EditMenu = function (index, Autoid) {
            $scope.MenuName = $scope.SubMenuList[index].menuName;
            $scope.SubMenu = $scope.SubMenuList[index].subMenu;
            $scope.Url = $scope.SubMenuList[index].menuUrl;
            $scope.Autoid = Autoid;
            $scope.BtnUpdate = true;
            $scope.BtnSave = true;
        }


        $scope.UpdateClick = function () {

            var dataobject = {
                AutoId: $scope.Autoid,
                MenuName: $scope.MenuName,
                SubMenu: $scope.SubMenu,
                MenuUrl: $scope.Url,

            }
            Data = JSON.stringify(dataobject);
            commonService.post("https://localhost:44360/api/Admin/UpdateIPadSubMenu", Data).then(function (response) {
                data = response.data;
                if (data == 0) {
                    $scope.MenuName = [0]["--Select--"];
                    $scope.SubMenu = "";
                    $scope.Url = "";
                    $scope.BtnUpdate = false;
                    $scope.BtnSave = false;
                    $scope.GetSubMenuAll();
                    alert("Updated SucessFully");
                }

            })
        }

        $scope.DeleteMenu = function (index, Autoid) {
            if (confirm("Are you sure want to delete ?")) {
                commonService.post("https://localhost:44360/api/Admin/DeleteIPadSubMenu?Id=" + Autoid + "", {}).then(function (response) {
                    data = response.data;
                    if (data == 'Deleted') {
                        $scope.MenuName = [0]["--Select--"];
                        $scope.SubMenu = "";
                        $scope.Url = "";
                        $scope.BtnUpdate = false;
                        $scope.BtnSave = false;
                        $scope.GetSubMenuAll();
                        alert("Deleted SucessFully");
                    }
                });
            }
        }

    }]);