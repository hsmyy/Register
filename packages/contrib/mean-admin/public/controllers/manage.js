/**
 * Created by fc on 14-11-16.
 */
'use strict';

angular.module('mean.mean-admin').controller('ManageController',
    ['$scope', '$http', '$filter', 'Global', 'Menus', '$rootScope','ngTableParams',
    function($scope, $http, $filter, Global, Menus, $rootScope, NgTableParams) {

        var users = [];
        $scope.checkboxes = {'checked' : false, items : {}};

        $http.get('/reg/find').success(function(data){
            users = data;
            console.log(users);
            $scope.userTable = new NgTableParams({
                page: 1,            // show first page
                count: 10           // count per page
            }, {
                total: users.length, // length of data
                getData: function($defer, params) {
                    var orderedData = params.filter() ?
                        $filter('filter')(data, params.filter()) :
                        data;

                    $scope.filter = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
                    params.total(orderedData.length);
                    $defer.resolve($scope.filter);
                }
            });
        }).error(function(err){
            alert(err.msg);
        });

        $scope.$watch('checkboxes.checked', function(value){
            angular.forEach($scope.filter, function(item){
                if( angular.isDefined(item._id)){
                    $scope.checkboxes.items[item._id] = value;
                }
            });
        });

        $scope.$watch('checkboxes.items', function(values){
            if (!$scope.filter) {
                return;
            }
            var checked = 0, unchecked = 0,
                total = $scope.filter.length;
            angular.forEach($scope.filter, function(item) {
                checked   +=  ($scope.checkboxes.items[item._id]) || 0;
                unchecked += (!$scope.checkboxes.items[item._id]) || 0;
            });
            if ((unchecked == 0) || (checked == 0)) {
                $scope.checkboxes.checked = (checked == total);
            }
            // grayed checkbox
            angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
        }, true);

        $scope.updates = function(status){
            var idList = [];

            for (var property in $scope.checkboxes.items) {
                if ($scope.checkboxes.items.hasOwnProperty(property)) {
                    if($scope.checkboxes.items[property]){
                        idList.push(property);
                    }
                }
            }
            // get email info
            var emailInfo = [];
            for(var i = 0,n = users.length; i < n; ++i){
                if($scope.checkboxes.items[users[i]._id]){
                    emailInfo.push(users[i].email);
                }
            }
            var payload = {'status': status, 'idList' : idList, 'emails': emailInfo};
            $http.post('reg/update', {'data': payload} )
                .success(function(data){
                    alert(data.msg);
                    //
                    for(var i = 0,n = users.length; i < n; ++i){
                        if($scope.checkboxes.items[users[i]._id]){
                            delete $scope.checkboxes.items[users[i]._id]
                            users.splice(i, 1);
                            --i;
                            --n;
                        }
                    }
                    $scope.userTable.reload();
                }).error(function(err){
                    alert(err.msg);
                });
        };
    }]
);