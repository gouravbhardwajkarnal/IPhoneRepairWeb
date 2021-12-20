angular.module("myApp")
    .controller("AdminCtrl", ['commonService', '$scope', '$timeout', '$window', '$filter', '$http', function (commonService, $scope, $timeout, $window, $filter, $http) {
        

        $scope.LoginClick = function () {

            var dataobject = {
                UserName: $scope.UserName,
                Password: $scope.Password
            }
            Data = JSON.stringify(dataobject);
            commonService.post("https://localhost:44360/api/Admin/AdminDetails", Data).then(function (response) {
                data = response.data;
                if (data == "Valid") {
                    $window.location.href = 'Dashboard.html';
                }
                else {
                    $scope.UserName = "";
                    $scope.Password = "";
                    $scope.Massage = "Invalid user details"
                }

            })
        }


    }]);