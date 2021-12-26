mod.controller("UserCntrl", ['commonService', '$scope', '$timeout', '$window', '$filter', '$http', function (commonService, $scope, $timeout, $window, $filter, $http) {
    $scope.ContactModel = {};

    $scope.InsertContactDetails = function () {
        debugger;
            //if ($scope.ContactModel.Name == "" || $scope.Name == null || $scope.Name == undefined) {
            //    $scope.ContactMsg = "Please Enter Name";
            //    return;
            //}
            //if ($scope.Email == "" || $scope.Email == null || $scope.Email == undefined) {
            //    $scope.ContactMsg = "Please Enter Email";
            //    return;
            //}
            var dataobject = {
                Name: $scope.ContactModel.Name,
                Phone: $scope.ContactModel.Phone,
                Email: $scope.ContactModel.Email,
                Location: $scope.ContactModel.Location,
                Query: $scope.ContactModel.Query,
                Repair_type: '',
                QueryType: 'Contact'

            }
            Data = JSON.stringify(dataobject);
            commonService.post(ApiDomain + "/api/Contact/Create", Data).then(function (response) {
                data = response.data;
                if (data == 0) {
                    alert("Added SucessFully");
                }

            })
        }



    }]);