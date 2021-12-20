mod.controller("MyCntrl", ['commonService', '$scope', '$timeout', '$window', '$filter', '$http', function (commonService, $scope, $timeout, $window, $filter, $http) {
        $scope.SaveClick = function () {

            var dataobject = {
                MenuName: $scope.MenuName,
                SubMenu: $scope.SubMenu,
                MenuUrl: $scope.Url,

            }
            Data = JSON.stringify(dataobject);
            commonService.post(ApiDomain + "/api/Admin/CreateSubMenu", Data).then(function (response) {
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
            commonService.post(ApiDomain + "/api/Admin/UpdateSubMenu", Data).then(function (response) {
                data = response.data;
                if (data == 0) {
                    $scope.MenuName =[0]["--Select--"];
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
                commonService.post(ApiDomain + "/api/Admin/DeleteSubMenu?Id=" + Autoid + "", {}).then(function (response) {
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