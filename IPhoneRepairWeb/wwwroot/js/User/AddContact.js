angular.module("myApp")
    .controller("ContactCtrl", ['commonService', '$scope', '$timeout', '$window', '$filter', 'MasterMenu', '$http', function (commonService, $scope, $timeout, $window, $filter, MasterMenu, $http) {
        MasterMenu.getMenuData("Fisrt")
            .then(function (response) {
                console.log(response.data);
            });

        $scope.InsertContactDetails = function () {
            if ($scope.Name == "" || $scope.Name == null || $scope.Name == undefined) {
                $scope.ContactMsg = "Please Enter Name";
                return;
            }
            if ($scope.Email == "" || $scope.Email == null || $scope.Email == undefined) {
                $scope.ContactMsg = "Please Enter Email";
                return;
            }
            var dataobject = {
                Name: $scope.Name,
                Phone: "",
                Email: $scope.Email,
                Location: $scope.Location,
                Query: $scope.Query,
                Repair_type: '',
                QueryType: 'Contact'

            }
            Data = JSON.stringify(dataobject);
            commonService.post("https://localhost:5001/api/Contact/Create", Data).then(function (response) {
                data = response.data;
                if (data == 0) {
                    alert("Added SucessFully");
                }

            })
        }



    }]);