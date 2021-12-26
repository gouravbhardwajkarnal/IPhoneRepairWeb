mod.directive('numericonly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
    .directive('numericonlydot', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    var transformedInput = text.replace(/[^0-9.]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
    .directive('numericonlytime', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    var transformedInput = text.replace(/[^0-9:]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
    .directive('alphanumericonly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    var transformedInput = text.replace(/[^0-9A-Za-z]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
    .directive('alphaspaceonly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    var transformedInput = text.replace(/[^A-Za-z ]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })

    .directive('focusMe', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
                scope.$watch(attrs.focusMe, function (value) {
                    if (value === true) {
                        $timeout(function () {
                            element[0].focus();
                            scope[attrs.focusMe] = false;
                        }, 300);
                    }
                });
            }
        }
    })

    .directive('loading', ['$http', function ($http) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };
                scope.$watch(scope.isLoading, function (value) {
                    if (value) {
                        element.removeClass('ng-hide');
                    } else {
                        element.addClass('ng-hide');
                    }
                });
            }
        };
    }])

    .directive('nametext', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    var transformedInput = text.replace(/[^A-Za-z ]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
    .directive('myEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.myEnter);

                    });

                    event.preventDefault();
                    event.target.blur();
                }
            });
        };
    })
    .directive('changeOnBlur', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModelCtrl) {
                if (attrs.type === 'radio' || attrs.type === 'checkbox')
                    return;

                var expressionToCall = attrs.changeOnBlur;

                var oldValue = null;
                elm.bind('focus', function () {
                    scope.$apply(function () {
                        oldValue = elm.val();
                    });
                })
                elm.bind('blur', function () {
                    scope.$apply(function () {
                        var newValue = elm.val();
                        if (newValue !== oldValue) {
                            scope.$eval(expressionToCall);
                        }
                    });
                });
            }
        };
    })
    .directive('uppercased', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (input) {
                    return input ? input.toUpperCase() : "";
                });
                element.css("text-transform", "uppercase");
            }
        };
    })
    .directive('myDatepicker', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                $(element).datepicker({
                    dateFormat: 'dd-mm-yy',
                    yearRange: "1900:2040",
                    onSelect: function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });

            }
        };
    })

    .factory('MasterMenu', function ($window, commonService, $http) {
        return {
            getMenuData: function (astd) {
                var request = $http({
                    method: 'GET',
                    url: 'https://localhost:5001/api/Contact/GetALL',
                    
                });
                return request;
            }
        }

    }).filter("groupBy", ["$parse", "$filter", function ($parse, $filter) {
        return function (array, groupByField) {
            var result = [];
            var prev_item = null;
            var groupKey = false;
            var filteredData = $filter('orderBy')(array, groupByField);
            for (var i = 0; i < filteredData.length; i++) {
                groupKey = false;
                if (prev_item !== null) {
                    if (prev_item[groupByField] !== filteredData[i][groupByField]) {
                        groupKey = true;
                    }
                } else {
                    groupKey = true;
                }
                if (groupKey) {
                    filteredData[i]['group_by_key'] = true;
                } else {
                    filteredData[i]['group_by_key'] = false;
                }
                result.push(filteredData[i]);
                prev_item = filteredData[i];
            }
            return result;
        }
    }])



