mod.controller("MyCntrl", ['commonService', '$scope', '$timeout', '$window', '$filter', '$http', function (commonService, $scope, $timeout, $window, $filter, $http) {


    $scope.SaveClick = function () {

        var dataobject = {
            MenuName: $scope.MenuName,
            MenuUrl: $scope.Url,
        }
        Data = JSON.stringify(dataobject);
        commonService.post(ApiDomain + "/api/Admin/Create", Data).then(function (response) {
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
        debugger
        commonService.get(ApiDomain + "/api/Admin/GetALL", {}).then(function (response) {
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
        commonService.post(ApiDomain + "/api/Admin/Update", Data).then(function (response) {
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
            commonService.post(ApiDomain + "/api/Admin/Delete?Id=" + Autoid + "", {}).then(function (response) {
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