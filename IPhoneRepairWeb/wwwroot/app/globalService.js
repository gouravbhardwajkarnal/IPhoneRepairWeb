mod.service("commonService", function ($q, $http, $location) {
        //url + "?callback=JSON_CALLBACK",
        this.get = function (url, data) {
            var defer = $q.defer();
            $http({
                method: 'GET',
                contentType: "application/json;charset=utf-8",
                url: url,
                data: data,
                dataType: 'json',
                async: false,
            }).then(function (response) {
                defer.resolve(response);
            }, function (error) {
                //deffered.reject(error);
            });
            return defer.promise;
        },
        this.post = function (url, data) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                contentType: "application/json;charset=utf-8",
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                //  headers: { 'VerificationToken': $("[id*=lblToken]")[0].innerText }
            }).then(function successCallback (response) {
                defer.resolve(response);
            }).catch(function errorCallback (error, status) {
                defer.reject();
                if (error.status == 404) {
                    window.location.href = '../Error.aspx';
                }
            }).then(function (data, status, header, config) {
                if (status == -1) {
                    $location.path("/dept");
                }
                defer.reject();
            });
            return defer.promise;
        }
    });


